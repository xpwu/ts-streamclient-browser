/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ts-streamclient-base/index.ts":
/*!****************************************************!*\
  !*** ./node_modules/ts-streamclient-base/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* reexport safe */ _src_client__WEBPACK_IMPORTED_MODULE_0__.Client),
/* harmony export */   "ConnError": () => (/* reexport safe */ _src_connerror__WEBPACK_IMPORTED_MODULE_4__.ConnError),
/* harmony export */   "ConnectTimeout": () => (/* reexport safe */ _src_option__WEBPACK_IMPORTED_MODULE_3__.ConnectTimeout),
/* harmony export */   "Connection": () => (/* reexport safe */ _src_connection__WEBPACK_IMPORTED_MODULE_2__.Connection),
/* harmony export */   "RequestTimeout": () => (/* reexport safe */ _src_option__WEBPACK_IMPORTED_MODULE_3__.RequestTimeout),
/* harmony export */   "Result": () => (/* reexport safe */ _src_client__WEBPACK_IMPORTED_MODULE_0__.Result),
/* harmony export */   "Utf8": () => (/* reexport safe */ _src_utf8__WEBPACK_IMPORTED_MODULE_1__.Utf8),
/* harmony export */   "WebSocket": () => (/* reexport safe */ _src_option__WEBPACK_IMPORTED_MODULE_3__.WebSocket)
/* harmony export */ });
/* harmony import */ var _src_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/client */ "./node_modules/ts-streamclient-base/src/client.ts");
/* harmony import */ var _src_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utf8 */ "./node_modules/ts-streamclient-base/src/utf8.ts");
/* harmony import */ var _src_connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/connection */ "./node_modules/ts-streamclient-base/src/connection.ts");
/* harmony import */ var _src_option__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/option */ "./node_modules/ts-streamclient-base/src/option.ts");
/* harmony import */ var _src_connerror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/connerror */ "./node_modules/ts-streamclient-base/src/connerror.ts");







/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/client.ts":
/*!*********************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/client.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* binding */ Client),
/* harmony export */   "Result": () => (/* binding */ Result)
/* harmony export */ });
/* harmony import */ var _fakehttp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fakehttp */ "./node_modules/ts-streamclient-base/src/fakehttp.ts");
/* harmony import */ var _net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./net */ "./node_modules/ts-streamclient-base/src/net.ts");
/* harmony import */ var _option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./option */ "./node_modules/ts-streamclient-base/src/option.ts");
/* harmony import */ var ts_xutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts-xutils */ "./node_modules/ts-xutils/index.ts");
/* harmony import */ var _connerror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./connerror */ "./node_modules/ts-streamclient-base/src/connerror.ts");
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utf8 */ "./node_modules/ts-streamclient-base/src/utf8.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






class Result {
    toString() {
        return new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(this.data).toString();
    }
    rawBuffer() {
        return new Uint8Array(this.data);
    }
    constructor(data) {
        this.data = data;
    }
}
let emptyResult = new Result(new ArrayBuffer(0));
class Client {
    // ws or wss 协议。
    constructor(wss, ...opf) {
        // private onPush: (res:string)=>Promise<void> = (res:string)=>{return Promise.resolve()};
        // private onPeerClosed: ()=>Promise<void> = ()=>{return Promise.resolve()};
        this.onPush = () => { };
        this.onPeerClosed = () => { };
        this.op = new _option__WEBPACK_IMPORTED_MODULE_2__.option;
        if (wss.indexOf("s://") === -1) {
            wss = "ws://" + wss;
        }
        for (let o of opf) {
            o(this.op);
        }
        this.net = new _net__WEBPACK_IMPORTED_MODULE_1__.Net(wss, this.op.connectTimeout, this.op.webSocketConstructor, {
            onMessage: (value) => {
                let res = new _fakehttp__WEBPACK_IMPORTED_MODULE_0__.Response(value);
                if (res.isPush()) {
                    // push ack 强制写给网络，不计入并发控制
                    this.net.WriteForce(res.newPushAck());
                    // 异步执行
                    setTimeout(() => {
                        this.onPush(new Result(res.data()));
                    }, 0);
                    return;
                }
                let clb = this.allReq.get(res.reqID()) || (() => { });
                this.net.receivedOneResponse();
                clb({ res: res, err: null });
                this.allReq.delete(res.reqID());
            }, onClose: (result) => {
                this.allReq.forEach((value) => {
                    value({ res: null, err: new _connerror__WEBPACK_IMPORTED_MODULE_4__.ConnError(new Error("closed by peer: " + JSON.stringify(result))) });
                });
                this.allReq.clear();
                // 异步执行
                setTimeout(() => {
                    this.onPeerClosed();
                }, 0);
            }
        });
        // start from 10
        this.reqId = 10;
        this.allReq = new Map();
    }
    updateWss(wss) {
        if (wss.indexOf("s://") === -1) {
            wss = "ws://" + wss;
        }
        this.net.updateWss(wss);
    }
    setPushCallback(clb) {
        this.onPush = clb;
    }
    setPeerClosedCallback(clb) {
        this.onPeerClosed = clb;
    }
    send(data, header) {
        return __awaiter(this, void 0, void 0, function* () {
            let err = yield this.net.Connect();
            if (err != null) {
                return [emptyResult, new _connerror__WEBPACK_IMPORTED_MODULE_4__.ConnError(err)];
            }
            let req = new _fakehttp__WEBPACK_IMPORTED_MODULE_0__.Request(data, header);
            let reqId = this.reqId++;
            req.SetReqId(reqId);
            let timer;
            let res = new Promise((resolve) => {
                this.allReq.set(reqId, (result) => {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    if (result.err !== null) {
                        resolve([emptyResult, result.err]);
                        return;
                    }
                    let res = result.res;
                    if (res.status !== _fakehttp__WEBPACK_IMPORTED_MODULE_0__.Status.Ok) {
                        resolve([emptyResult, new Error(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data()).toString())]);
                        return;
                    }
                    resolve([new Result(res.data()), null]);
                });
                timer = setTimeout(() => {
                    this.allReq.delete(reqId);
                    resolve([emptyResult, new Error("timeout")]);
                }, this.op.requestTimeout / ts_xutils__WEBPACK_IMPORTED_MODULE_3__.Millisecond);
            });
            err = yield this.net.Write(req.ToData());
            // 向网络写数据失败，也应该归为连接层的错误
            if (err != null) {
                this.allReq.delete(reqId);
                if (timer) {
                    clearTimeout(timer);
                }
                return [emptyResult, new _connerror__WEBPACK_IMPORTED_MODULE_4__.ConnError(err)];
            }
            return res;
        });
    }
    recover() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.net.Connect();
        });
    }
}


/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/connection.ts":
/*!*************************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/connection.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Connection": () => (/* binding */ Connection),
/* harmony export */   "DummyWs": () => (/* binding */ DummyWs)
/* harmony export */ });
class DummyWs {
    constructor() {
        this.onclose = () => { };
        this.onerror = () => { };
        this.onmessage = () => { };
        this.onopen = () => { };
    }
    close() {
    }
    send() {
        throw new Error("not set WebSocketConstructor");
    }
}
class Connection {
    constructor(url, websocketConstructor) {
        this.maxConcurrent = 5;
        this.maxBytes = 4 * 1024 * 1024;
        this.connectID = "";
        this.onclose = () => { };
        this.onerror = () => { };
        this.onmessage = () => { };
        this.onopen = () => { };
        this.waitingSend = new Array();
        this.concurrent = 0;
        this.websocket = new websocketConstructor(url);
        this.websocket.onclose = (ev) => {
            this.onclose(ev);
        };
        this.websocket.onerror = (ev) => {
            this.onerror(ev);
        };
        this.websocket.onmessage = (result) => {
            let err = this.readHandshake(result);
            if (err != null) {
                console.error(err);
                this.websocket.onclose = () => { };
                this.websocket.onerror = () => { };
                this.websocket.onopen = () => { };
                this.websocket.onmessage = () => { };
                this.websocket.close();
                this.onerror({ errMsg: err.message });
                return;
            }
            // 设置为真正的接收函数
            this.websocket.onmessage = this.onmessage;
            // 握手结束才是真正的onopen
            this.onopen({});
        };
        this.websocket.onopen = (_) => {
            // nothing to do
        };
    }
    /*
      HeartBeat_s | FrameTimeout_s | MaxConcurrent | MaxBytes | connect id
      HeartBeat_s: 2 bytes, net order
      FrameTimeout_s: 1 byte  ===0
      MaxConcurrent: 1 byte
      MaxBytes: 4 bytes, net order
      connect id: 8 bytes, net order
  */
    readHandshake(result) {
        let buffer = result.data;
        if (buffer.byteLength != 16) {
            return new Error("len(handshake) != 16");
        }
        let view = new DataView(buffer);
        this.maxConcurrent = view.getUint8(3);
        this.maxBytes = view.getUint32(4);
        this.connectID = ("00000000" + view.getUint32(8).toString(16)).slice(-8) +
            ("00000000" + view.getUint32(12).toString(16)).slice(-8);
        console.log("connectID = ", this.connectID);
        return null;
    }
    receivedOneResponse() {
        this.concurrent--;
        // 防御性代码
        if (this.concurrent < 0) {
            console.warn("connection.concurrent < 0");
            this.concurrent = 0;
        }
        this._send();
    }
    _send() {
        if (this.concurrent > this.maxConcurrent) {
            return;
        }
        if (this.waitingSend.length == 0) {
            return;
        }
        this.concurrent++;
        this.websocket.send(this.waitingSend.shift());
    }
    send(data) {
        if (data.byteLength > this.maxBytes) {
            return new Error("data is too large! Must be less than " + this.maxBytes.toString() + ". ");
        }
        this.waitingSend.push(data);
        this._send();
        return null;
    }
    SendForce(data) {
        this.websocket.send(data);
    }
    close() {
        this.websocket.close();
    }
}


/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/connerror.ts":
/*!************************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/connerror.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnError": () => (/* binding */ ConnError)
/* harmony export */ });
class ConnError {
    constructor(error) {
        this.message = error.message;
        this.name = error.name;
        this.stack = error.stack;
    }
}


/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/fakehttp.ts":
/*!***********************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/fakehttp.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Request": () => (/* binding */ Request),
/* harmony export */   "Response": () => (/* binding */ Response),
/* harmony export */   "Status": () => (/* binding */ Status)
/* harmony export */ });
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utf8 */ "./node_modules/ts-streamclient-base/src/utf8.ts");
/**

 content protocol:
   request ---
     reqid | headers | header-end-flag | data
     reqid: 4 bytes, net order;
     headers: < key-len | key | value-len | value > ... ;  [optional]
     key-len: 1 byte,  key-len = sizeof(key);
     value-len: 1 byte, value-len = sizeof(value);
     header-end-flag: 1 byte, === 0;
     data:       [optional]

      reqid = 1: client push ack to server.
            ack: no headers;
            data: pushId. 4 bytes, net order;

 ---------------------------------------------------------------------
   response ---
     reqid | status | data
     reqid: 4 bytes, net order;
     status: 1 byte, 0---success, 1---failed
     data: if status==success, data=<app data>    [optional]
     if status==failed, data=<error reason>


    reqid = 1: server push to client
        status: 0
          data: first 4 bytes --- pushId, net order;
                last --- real data

 */

class Request {
    constructor(data, header) {
        let len = 4;
        header = header || new Map();
        let headerArr = new Array();
        header.forEach((value, key, _) => {
            let utf8 = { key: new _utf8__WEBPACK_IMPORTED_MODULE_0__.Utf8(key), value: new _utf8__WEBPACK_IMPORTED_MODULE_0__.Utf8(value) };
            headerArr.push(utf8);
            len += 1 + utf8.key.byteLength + 1 + utf8.value.byteLength;
        });
        let body = new _utf8__WEBPACK_IMPORTED_MODULE_0__.Utf8(data);
        len += 1 + body.byteLength;
        this.buffer = new ArrayBuffer(len);
        let pos = 4;
        for (let h of headerArr) {
            (new DataView(this.buffer)).setUint8(pos, h.key.byteLength);
            pos++;
            (new Uint8Array(this.buffer)).set(h.key.raw, pos);
            pos += h.key.byteLength;
            (new DataView(this.buffer)).setUint8(pos, h.value.byteLength);
            pos++;
            (new Uint8Array(this.buffer)).set(h.value.raw, pos);
            pos += h.value.byteLength;
        }
        (new DataView(this.buffer)).setUint8(pos, 0);
        pos++;
        (new Uint8Array(this.buffer)).set(body.raw, pos);
    }
    SetReqId(id) {
        (new DataView(this.buffer)).setUint32(0, id);
    }
    ToData() {
        return this.buffer;
    }
}
var Status;
(function (Status) {
    Status[Status["Ok"] = 0] = "Ok";
    Status[Status["Failed"] = 1] = "Failed";
})(Status || (Status = {}));
class Response {
    constructor(buffer) {
        this.buffer = new Uint8Array(buffer);
        this.status = this.buffer[4] == 0 ? Status.Ok : Status.Failed;
    }
    reqID() {
        return (new DataView(this.buffer.buffer)).getUint32(0);
    }
    data() {
        let offset = 5;
        if (this.isPush()) {
            // pushId
            offset += 4;
        }
        if (this.buffer.byteLength <= offset) {
            return new ArrayBuffer(0);
        }
        return this.buffer.slice(offset).buffer;
        // let utf8 = new Utf8(this.buffer.slice(offset));
        // return utf8.toString();
    }
    isPush() {
        return this.reqID() === 1;
    }
    newPushAck() {
        if (!this.isPush() || this.buffer.byteLength <= 4 + 1 + 4) {
            return new ArrayBuffer(0);
        }
        let ret = new ArrayBuffer(4 + 1 + 4);
        let view = new DataView(ret);
        view.setUint32(0, 1);
        view.setUint8(4, 0);
        view.setUint32(5, (new DataView(this.buffer.buffer)).getUint32(5));
        return ret;
    }
    static fromError(reqId, err) {
        let utf8 = new _utf8__WEBPACK_IMPORTED_MODULE_0__.Utf8(err.message);
        let buffer = new Uint8Array(4 + 1 + utf8.byteLength);
        (new DataView(buffer.buffer)).setUint32(0, reqId);
        buffer[4] = 1;
        buffer.set(utf8.raw, 5);
        return new Response(buffer);
    }
}


/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/net.ts":
/*!******************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/net.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Net": () => (/* binding */ Net)
/* harmony export */ });
/* harmony import */ var ts_xutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-xutils */ "./node_modules/ts-xutils/index.ts");
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection */ "./node_modules/ts-streamclient-base/src/connection.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Net {
    constructor(wss, connectTimeout, webSocketConstructor, handle) {
        this.wss = wss;
        this.connectTimeout = connectTimeout;
        this.webSocketConstructor = webSocketConstructor;
        this.handle = handle;
        this.conn = null;
        this.connected = false;
        this.waitingConnect = new Array();
    }
    doWaitingConnect(err) {
        for (let waiting of this.waitingConnect) {
            waiting(err);
        }
        this.waitingConnect = new Array();
    }
    invalidWebsocket() {
        this.conn.onmessage = () => { };
        this.conn.onopen = () => { };
        this.conn.onclose = () => { };
        this.conn.onerror = () => { };
        this.conn = null;
    }
    updateWss(wss) {
        this.wss = wss;
    }
    // 采用最多只有一条连接处于活跃状态的策略（包括：connecting/connect/closing)，连接的判读可以单一化，对上层暴露的调用可以简单化。
    // 但对一些极限操作可能具有滞后性，比如正处于closing的时候(代码异步执行中)，新的Connect调用不能立即连接。为了尽可能的避免这种情况，
    // 在onerror 及 onclose 中都使用了同步代码。
    // 后期如果采用多条活跃状态的策略(比如：一条closing，一条connecting)，需要考虑net.handle的定义及异步情况的时序问题。
    Connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected) {
                return null;
            }
            return new Promise((resolve) => {
                this.waitingConnect.push(resolve);
                if (this.conn != null) {
                    return;
                }
                let timer = setTimeout(() => {
                    // invalid this.websocket
                    this.invalidWebsocket();
                    this.connected = false;
                    this.doWaitingConnect(new Error("connect timeout"));
                }, this.connectTimeout / ts_xutils__WEBPACK_IMPORTED_MODULE_0__.Millisecond);
                try {
                    this.conn = new _connection__WEBPACK_IMPORTED_MODULE_1__.Connection(this.wss, this.webSocketConstructor);
                }
                catch (e) {
                    // 目前观测到：1、如果url写错，则是直接在new就会抛出异常；2、如果是真正的连接失败，则会触发onerror，同时还会触发onclose
                    console.error(e);
                    this.conn = null;
                    this.connected = false;
                    clearTimeout(timer);
                    this.doWaitingConnect(new Error(e));
                    return;
                }
                this.conn.onmessage = (result) => {
                    this.handle.onMessage(result.data);
                };
                this.conn.onopen = () => {
                    this.connected = true;
                    clearTimeout(timer);
                    this.doWaitingConnect(null);
                };
                this.conn.onclose = (result) => {
                    var _a;
                    // 此处只考虑还处于连接的情况，其他情况可以参见 onerror的处理
                    if (!this.connected) {
                        return;
                    }
                    let closeEvent = { code: result.code, reason: result.reason };
                    if (closeEvent.reason === "" || closeEvent.reason === undefined || closeEvent.reason === null) {
                        closeEvent.reason = "unknown";
                    }
                    console.warn("net---onClosed, ", JSON.stringify(closeEvent));
                    this.handle.onClose(closeEvent);
                    (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close();
                    this.conn = null;
                    this.connected = false;
                };
                this.conn.onerror = (result) => {
                    var _a;
                    console.error("net---onError", result);
                    // 需要考虑连接失败的防御性代码，websocket接口没有明确指出连接失败由哪个接口返回，故这里加上连接失败的处理
                    // 目前观测到：1、如果url写错，则是直接在new就会抛出异常；2、如果是真正的连接失败，则会触发onerror，同时还会触发onclose
                    // 没有开始连接或者其他任何情况造成this.conn被置为空，都直接返回
                    if (this.conn === null) {
                        return;
                    }
                    // 响应了onerror 就不再响应onclose
                    this.conn.onclose = () => { };
                    // 目前做如下的设定：一个上层的pending调用(连接或者请求等)，要么是在等待连接中
                    // 要么是在等待response中。即使出现异常，上层一般可能都有超时，仍不会一直被pending
                    // todo: 是否会有同时出现在 等连接 与 等响应 中？
                    if (!this.connected) {
                        clearTimeout(timer);
                        this.doWaitingConnect(new Error(result.errMsg));
                    }
                    else {
                        this.handle.onClose({ code: -1, reason: "onerror: " + result.errMsg });
                        if (this.handle.onError) {
                            this.handle.onError();
                        }
                    }
                    (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close();
                    this.conn = null;
                    this.connected = false;
                };
            });
        });
    }
    Write(data) {
        if (this.conn == null || !this.connected) {
            return new Error("not connected");
        }
        return this.conn.send(data);
    }
    WriteForce(data) {
        var _a;
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.SendForce(data);
    }
    receivedOneResponse() {
        var _a;
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.receivedOneResponse();
    }
}


/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/option.ts":
/*!*********************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/option.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectTimeout": () => (/* binding */ ConnectTimeout),
/* harmony export */   "RequestTimeout": () => (/* binding */ RequestTimeout),
/* harmony export */   "WebSocket": () => (/* binding */ WebSocket),
/* harmony export */   "option": () => (/* binding */ option)
/* harmony export */ });
/* harmony import */ var ts_xutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-xutils */ "./node_modules/ts-xutils/index.ts");
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection */ "./node_modules/ts-streamclient-base/src/connection.ts");


class option {
    constructor() {
        this.requestTimeout = 30 * ts_xutils__WEBPACK_IMPORTED_MODULE_0__.Second;
        this.connectTimeout = 30 * ts_xutils__WEBPACK_IMPORTED_MODULE_0__.Second;
        this.webSocketConstructor = _connection__WEBPACK_IMPORTED_MODULE_1__.DummyWs;
    }
}
function RequestTimeout(d) {
    return (op) => {
        op.requestTimeout = d;
    };
}
function ConnectTimeout(d) {
    return (op) => {
        op.connectTimeout = d;
    };
}
function WebSocket(webSocketConstructor) {
    return (op) => {
        op.webSocketConstructor = webSocketConstructor;
    };
}


/***/ }),

/***/ "./node_modules/ts-streamclient-base/src/utf8.ts":
/*!*******************************************************!*\
  !*** ./node_modules/ts-streamclient-base/src/utf8.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Utf8": () => (/* binding */ Utf8)
/* harmony export */ });
class Utf8 {
    constructor(input) {
        this.indexes = new Array();
        if (typeof input !== "string") {
            this.raw = new Uint8Array(input);
            this.str = "";
            let utf8i = 0;
            while (utf8i < this.raw.length) {
                this.indexes.push(utf8i);
                let code = Utf8.loadUTF8CharCode(this.raw, utf8i);
                this.str += String.fromCodePoint(code);
                utf8i += Utf8.getUTF8CharLength(code);
            }
            this.indexes.push(utf8i); // end flag
        }
        else {
            this.str = input;
            let length = 0;
            for (let ch of input) {
                length += Utf8.getUTF8CharLength(ch.codePointAt(0));
            }
            this.raw = new Uint8Array(length);
            let index = 0;
            for (let ch of input) {
                this.indexes.push(index);
                index = Utf8.putUTF8CharCode(this.raw, ch.codePointAt(0), index);
            }
            this.indexes.push(index); // end flag
        }
        this.length = this.indexes.length - 1;
        this.byteLength = this.raw.byteLength;
    }
    static loadUTF8CharCode(aChars, nIdx) {
        let nLen = aChars.length, nPart = aChars[nIdx];
        return nPart > 251 && nPart < 254 && nIdx + 5 < nLen ?
            /* (nPart - 252 << 30) may be not safe in ECMAScript! So...: */
            /* six bytes */ (nPart - 252) * 1073741824 + (aChars[nIdx + 1] - 128 << 24)
                + (aChars[nIdx + 2] - 128 << 18) + (aChars[nIdx + 3] - 128 << 12)
                + (aChars[nIdx + 4] - 128 << 6) + aChars[nIdx + 5] - 128
            : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ?
                /* five bytes */ (nPart - 248 << 24) + (aChars[nIdx + 1] - 128 << 18)
                    + (aChars[nIdx + 2] - 128 << 12) + (aChars[nIdx + 3] - 128 << 6)
                    + aChars[nIdx + 4] - 128
                : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ?
                    /* four bytes */ (nPart - 240 << 18) + (aChars[nIdx + 1] - 128 << 12)
                        + (aChars[nIdx + 2] - 128 << 6) + aChars[nIdx + 3] - 128
                    : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ?
                        /* three bytes */ (nPart - 224 << 12) + (aChars[nIdx + 1] - 128 << 6)
                            + aChars[nIdx + 2] - 128
                        : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ?
                            /* two bytes */ (nPart - 192 << 6) + aChars[nIdx + 1] - 128
                            :
                                /* one byte */ nPart;
    }
    static putUTF8CharCode(aTarget, nChar, nPutAt) {
        let nIdx = nPutAt;
        if (nChar < 0x80 /* 128 */) {
            /* one byte */
            aTarget[nIdx++] = nChar;
        }
        else if (nChar < 0x800 /* 2048 */) {
            /* two bytes */
            aTarget[nIdx++] = 0xc0 /* 192 */ + (nChar >>> 6);
            aTarget[nIdx++] = 0x80 /* 128 */ + (nChar & 0x3f /* 63 */);
        }
        else if (nChar < 0x10000 /* 65536 */) {
            /* three bytes */
            aTarget[nIdx++] = 0xe0 /* 224 */ + (nChar >>> 12);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 6) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + (nChar & 0x3f /* 63 */);
        }
        else if (nChar < 0x200000 /* 2097152 */) {
            /* four bytes */
            aTarget[nIdx++] = 0xf0 /* 240 */ + (nChar >>> 18);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 12) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 6) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + (nChar & 0x3f /* 63 */);
        }
        else if (nChar < 0x4000000 /* 67108864 */) {
            /* five bytes */
            aTarget[nIdx++] = 0xf8 /* 248 */ + (nChar >>> 24);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 18) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 12) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 6) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + (nChar & 0x3f /* 63 */);
        }
        else /* if (nChar <= 0x7fffffff) */ { /* 2147483647 */
            /* six bytes */
            aTarget[nIdx++] = 0xfc /* 252 */ + /* (nChar >>> 30) may be not safe in ECMAScript! So...: */ (nChar / 1073741824);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 24) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 18) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 12) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + ((nChar >>> 6) & 0x3f /* 63 */);
            aTarget[nIdx++] = 0x80 /* 128 */ + (nChar & 0x3f /* 63 */);
        }
        return nIdx;
    }
    ;
    static getUTF8CharLength(nChar) {
        return nChar < 0x80 ? 1 : nChar < 0x800 ? 2 : nChar < 0x10000
            ? 3 : nChar < 0x200000 ? 4 : nChar < 0x4000000 ? 5 : 6;
    }
    // private static loadUTF16CharCode(aChars: Uint16Array, nIdx: number): number {
    //
    //   /* UTF-16 to DOMString decoding algorithm */
    //   let nFrstChr = aChars[nIdx];
    //
    //   return nFrstChr > 0xD7BF /* 55231 */ && nIdx + 1 < aChars.length ?
    //     (nFrstChr - 0xD800 /* 55296 */ << 10) + aChars[nIdx + 1] + 0x2400 /* 9216 */
    //     : nFrstChr;
    // }
    //
    // private static putUTF16CharCode(aTarget: Uint16Array, nChar: number, nPutAt: number):number {
    //
    //   let nIdx = nPutAt;
    //
    //   if (nChar < 0x10000 /* 65536 */) {
    //     /* one element */
    //     aTarget[nIdx++] = nChar;
    //   } else {
    //     /* two elements */
    //     aTarget[nIdx++] = 0xD7C0 /* 55232 */ + (nChar >>> 10);
    //     aTarget[nIdx++] = 0xDC00 /* 56320 */ + (nChar & 0x3FF /* 1023 */);
    //   }
    //
    //   return nIdx;
    // }
    //
    // private static getUTF16CharLength(nChar: number): number {
    //   return nChar < 0x10000 ? 1 : 2;
    // }
    toString() {
        return this.str;
    }
    // Deprecated
    codePointAt(index) {
        return this.codeUnitAt(index);
    }
    codeUnitAt(index) {
        return this.raw.slice(this.indexes[index], this.indexes[index + 1]);
    }
}


/***/ }),

/***/ "./node_modules/ts-streamclient-browser/index.ts":
/*!*******************************************************!*\
  !*** ./node_modules/ts-streamclient-browser/index.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewClient": () => (/* binding */ NewClient)
/* harmony export */ });
/* harmony import */ var ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-streamclient-base */ "./node_modules/ts-streamclient-base/index.ts");
/* harmony import */ var _src_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/websocket */ "./node_modules/ts-streamclient-browser/src/websocket.ts");


function NewClient(wss, ...opf) {
    opf.push((0,ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__.WebSocket)(_src_websocket__WEBPACK_IMPORTED_MODULE_1__.DomWebSocket));
    return new ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__.Client(wss, ...opf);
}


/***/ }),

/***/ "./node_modules/ts-streamclient-browser/src/websocket.ts":
/*!***************************************************************!*\
  !*** ./node_modules/ts-streamclient-browser/src/websocket.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DomWebSocket": () => (/* binding */ DomWebSocket)
/* harmony export */ });
class DomWebSocket {
    constructor(url) {
        this.onclose = () => { };
        this.onerror = () => { };
        this.onmessage = () => { };
        this.onopen = () => { };
        this.websocket = new WebSocket(url);
        this.websocket.binaryType = "arraybuffer";
        this.websocket.onclose = (ev) => {
            console.warn("DomWebSocket---onclose");
            this.onclose(ev);
        };
        this.websocket.onerror = (ev) => {
            console.error("DomWebSocket---onerror");
            this.onerror({ errMsg: "DomWebSocket: onerror. " + ev.toString() });
        };
        this.websocket.onmessage = (ev) => {
            this.onmessage(ev);
        };
        this.websocket.onopen = (ev) => {
            this.onopen(ev);
        };
    }
    close(code, reason) {
        this.websocket.close(code, reason);
    }
    send(data) {
        this.websocket.send(data);
    }
}


/***/ }),

/***/ "./node_modules/ts-xutils/index.ts":
/*!*****************************************!*\
  !*** ./node_modules/ts-xutils/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hour": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Hour),
/* harmony export */   "Microsecond": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Microsecond),
/* harmony export */   "Millisecond": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Millisecond),
/* harmony export */   "Minute": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Minute),
/* harmony export */   "Second": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Second)
/* harmony export */ });
/* harmony import */ var _src_duration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/duration */ "./node_modules/ts-xutils/src/duration.ts");



/***/ }),

/***/ "./node_modules/ts-xutils/src/duration.ts":
/*!************************************************!*\
  !*** ./node_modules/ts-xutils/src/duration.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hour": () => (/* binding */ Hour),
/* harmony export */   "Microsecond": () => (/* binding */ Microsecond),
/* harmony export */   "Millisecond": () => (/* binding */ Millisecond),
/* harmony export */   "Minute": () => (/* binding */ Minute),
/* harmony export */   "Second": () => (/* binding */ Second)
/* harmony export */ });
const Microsecond = 1;
const Millisecond = 1000 * Microsecond;
const Second = 1000 * Millisecond;
const Minute = 60 * Second;
const Hour = 60 * Minute;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "send": () => (/* binding */ send)
/* harmony export */ });
/* harmony import */ var ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-streamclient-base */ "./node_modules/ts-streamclient-base/index.ts");
/* harmony import */ var ts_streamclient_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-streamclient-browser */ "./node_modules/ts-streamclient-browser/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// client: Client


let client = null;
let url = "";
function headers(cache) {
    let ret = new Map();
    let key = "";
    key = $("#key1").val().trim();
    if (key !== "") {
        cache.key1 = key;
        cache.value1 = $("#value1").val().trim();
        ret.set(key, cache.value1);
    }
    else {
        cache.key1 = "";
        cache.value1 = "";
    }
    key = $("#key2").val().trim();
    if (key !== "") {
        cache.key2 = key;
        cache.value2 = $("#value2").val().trim();
        ret.set(key, cache.value2);
    }
    else {
        cache.key2 = "";
        cache.value2 = "";
    }
    key = $("#key3").val().trim();
    if (key !== "") {
        cache.key3 = key;
        cache.value3 = $("#value3").val().trim();
        ret.set(key, cache.value3);
    }
    else {
        cache.key3 = "";
        cache.value3 = "";
    }
    return ret;
}
function print(string) {
    let body = $('body');
    body.append("<p>" + string + "</p>");
}
function printPush(string) {
    let body = $('body');
    body.append("<p style='color: cadetblue'>" + string + "</p>");
}
function printError(string) {
    let body = $('body');
    body.append("<p style='color: red'>" + string + "</p>");
}
function send() {
    return __awaiter(this, void 0, void 0, function* () {
        let wss = $("#wss").val();
        if (client === null || url != wss) {
            url = wss;
            client = (0,ts_streamclient_browser__WEBPACK_IMPORTED_MODULE_1__.NewClient)(url);
            client.setPushCallback((data) => {
                printPush("push: " + data.toString());
            });
            client.setPeerClosedCallback(() => {
                printError("conn: closed by peer");
            });
        }
        let cache = new Cache();
        cache.wss = url;
        cache.data = $("#post").val();
        let [ret, err] = yield client.send(cache.data, headers(cache));
        localStorage.setItem("last", JSON.stringify(cache));
        if (err !== null) {
            if (err instanceof ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__.ConnError) {
                client = null;
                printError("conn-error: " + err.message);
            }
            else {
                printError("resp-error: " + err.message);
            }
        }
        else {
            print("resp: " + ret.toString() + "\n ---> json: " + JSON.stringify(JSON.parse(ret.toString())));
            console.log("resp---json: ");
            console.log(JSON.parse(ret.toString()));
        }
    });
}
$("#send").on("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield send();
}));
class Cache {
    constructor() {
        this.wss = "";
        this.key1 = "";
        this.value1 = "";
        this.key2 = "";
        this.value2 = "";
        this.key3 = "";
        this.value3 = "";
        this.data = "";
    }
}
$(() => {
    let cacheS = localStorage.getItem("last");
    let cache;
    if (cacheS === null) {
        cache = new Cache();
    }
    else {
        cache = JSON.parse(cacheS);
    }
    $("#key1").attr("value", cache.key1);
    $("#value1").attr("value", cache.value1);
    $("#key2").attr("value", cache.key2);
    $("#value2").attr("value", cache.value2);
    $("#key3").attr("value", cache.key3);
    $("#value3").attr("value", cache.value3);
    $("#wss").attr("value", cache.wss);
    $("#post").attr("value", cache.data);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDdkIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUQsR0FBRyxFQUFFLENBQUM7WUFDTixDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRCxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDeEIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUQsR0FBRyxFQUFFLENBQUM7WUFDTixDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwRCxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7U0FDM0I7UUFDRCxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsR0FBRyxFQUFFLENBQUM7UUFFTixDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxRQUFRLENBQUMsRUFBUztRQUN2QixDQUFDLElBQUksUUFB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Q0FBQztJQUN4QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3RDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY29ubmVycm9yLnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2Zha2VodHRwLnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL25ldC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1iYXNlL3NyYy9vcHRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvdXRmOC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1icm93c2VyL2luZGV4LnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJyb3dzZXIvc3JjL3dlYnNvY2tldC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9zcmMvZHVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCB7Q2xpZW50LCBSZXN1bHR9IGZyb20gXCIuL3NyYy9jbGllbnRcIlxuXG5leHBvcnQge1V0Zjh9IGZyb20gXCIuL3NyYy91dGY4XCJcblxuZXhwb3J0IHR5cGUge0V2ZW50LCBFcnJvckV2ZW50LCBXZWJTb2NrZXRDb25zdHJ1Y3RvciwgV2ViU29ja2V0SW50ZXJmYWNlLCBDbG9zZUV2ZW50LCBNZXNzYWdlRXZlbnR9IGZyb20gXCIuL3NyYy9jb25uZWN0aW9uXCJcblxuZXhwb3J0IHtDb25uZWN0aW9ufSBmcm9tIFwiLi9zcmMvY29ubmVjdGlvblwiXG5cbmV4cG9ydCB0eXBlIHtPcHRpb259IGZyb20gXCIuL3NyYy9vcHRpb25cIlxuXG5leHBvcnQge1JlcXVlc3RUaW1lb3V0LCBDb25uZWN0VGltZW91dCwgV2ViU29ja2V0fSBmcm9tIFwiLi9zcmMvb3B0aW9uXCJcblxuZXhwb3J0IHtDb25uRXJyb3J9IGZyb20gXCIuL3NyYy9jb25uZXJyb3JcIlxuIiwiXG5pbXBvcnQge1JlcXVlc3QsIFJlc3BvbnNlLCBTdGF0dXN9IGZyb20gXCIuL2Zha2VodHRwXCI7XG5pbXBvcnQge05ldH0gZnJvbSBcIi4vbmV0XCJcbmltcG9ydCB7b3B0aW9uLCBPcHRpb259IGZyb20gXCIuL29wdGlvblwiXG5pbXBvcnQge01pbGxpc2Vjb25kfSBmcm9tIFwidHMteHV0aWxzXCJcbmltcG9ydCB7Q2xvc2VFdmVudH0gZnJvbSBcIi4vY29ubmVjdGlvblwiXG5pbXBvcnQge0Nvbm5FcnJvcn0gZnJvbSBcIi4vY29ubmVycm9yXCJcbmltcG9ydCB7VXRmOH0gZnJvbSBcIi4vdXRmOFwiXG5cbmV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICBwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmcge1xuICAgIHJldHVybiBuZXcgVXRmOCh0aGlzLmRhdGEpLnRvU3RyaW5nKClcbiAgfVxuXG4gIHB1YmxpYyByYXdCdWZmZXIoKTpVaW50OEFycmF5IHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5kYXRhKVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhOkFycmF5QnVmZmVyKSB7XG4gIH1cbn1cblxubGV0IGVtcHR5UmVzdWx0ID0gbmV3IFJlc3VsdChuZXcgQXJyYXlCdWZmZXIoMCkpXG5cbmV4cG9ydCBjbGFzcyBDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IG5ldDogTmV0O1xuICBwcml2YXRlIGFsbFJlcTogTWFwPG51bWJlciwgKHJlc3VsdDoge3JlczogUmVzcG9uc2UsIGVycjogbnVsbH18e3JlczogbnVsbCwgZXJyOiBFcnJvcn0pID0+IHZvaWQ+O1xuICBwcml2YXRlIHJlcUlkOiBudW1iZXI7XG4gIC8vIHByaXZhdGUgb25QdXNoOiAocmVzOnN0cmluZyk9PlByb21pc2U8dm9pZD4gPSAocmVzOnN0cmluZyk9PntyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCl9O1xuICAvLyBwcml2YXRlIG9uUGVlckNsb3NlZDogKCk9PlByb21pc2U8dm9pZD4gPSAoKT0+e3JldHVybiBQcm9taXNlLnJlc29sdmUoKX07XG4gIHByaXZhdGUgb25QdXNoOiAocmVzOlJlc3VsdCk9PnZvaWQgPSAoKT0+e307XG4gIHByaXZhdGUgb25QZWVyQ2xvc2VkOiAoKT0+dm9pZCA9ICgpPT57fTtcbiAgcHJpdmF0ZSBvcCA9IG5ldyBvcHRpb25cblxuICAvLyB3cyBvciB3c3Mg5Y2P6K6u44CCXG4gIGNvbnN0cnVjdG9yKHdzczogc3RyaW5nLCAuLi5vcGY6IE9wdGlvbltdKSB7XG4gICAgaWYgKHdzcy5pbmRleE9mKFwiczovL1wiKSA9PT0gLTEpIHtcbiAgICAgIHdzcyA9IFwid3M6Ly9cIiArIHdzcztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBvIG9mIG9wZikge1xuICAgICAgbyh0aGlzLm9wKVxuICAgIH1cblxuICAgIHRoaXMubmV0ID0gbmV3IE5ldCh3c3MsIHRoaXMub3AuY29ubmVjdFRpbWVvdXQsIHRoaXMub3Aud2ViU29ja2V0Q29uc3RydWN0b3IsIHtcbiAgICAgIG9uTWVzc2FnZTogKHZhbHVlOiBBcnJheUJ1ZmZlcik6IHZvaWQgPT4ge1xuICAgICAgICBsZXQgcmVzID0gbmV3IFJlc3BvbnNlKHZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5pc1B1c2goKSkge1xuICAgICAgICAgIC8vIHB1c2ggYWNrIOW8uuWItuWGmee7mee9kee7nO+8jOS4jeiuoeWFpeW5tuWPkeaOp+WItlxuICAgICAgICAgIHRoaXMubmV0LldyaXRlRm9yY2UocmVzLm5ld1B1c2hBY2soKSlcbiAgICAgICAgICAvLyDlvILmraXmiafooYxcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLm9uUHVzaChuZXcgUmVzdWx0KHJlcy5kYXRhKCkpKVxuICAgICAgICAgIH0sIDApXG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xiID0gdGhpcy5hbGxSZXEuZ2V0KHJlcy5yZXFJRCgpKSB8fCAoKCkgPT4ge30pO1xuICAgICAgICB0aGlzLm5ldC5yZWNlaXZlZE9uZVJlc3BvbnNlKClcbiAgICAgICAgY2xiKHtyZXM6cmVzLCBlcnI6bnVsbH0pO1xuICAgICAgICB0aGlzLmFsbFJlcS5kZWxldGUocmVzLnJlcUlEKCkpO1xuXG4gICAgICB9LCBvbkNsb3NlOiAocmVzdWx0OiBDbG9zZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuYWxsUmVxLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdmFsdWUoe3JlczpudWxsLCBlcnI6IG5ldyBDb25uRXJyb3IobmV3IEVycm9yKFwiY2xvc2VkIGJ5IHBlZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWxsUmVxLmNsZWFyKClcblxuICAgICAgICAvLyDlvILmraXmiafooYxcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgIHRoaXMub25QZWVyQ2xvc2VkKClcbiAgICAgICAgfSwgMClcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHN0YXJ0IGZyb20gMTBcbiAgICB0aGlzLnJlcUlkID0gMTA7XG4gICAgdGhpcy5hbGxSZXEgPSBuZXcgTWFwKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlV3NzKHdzczogc3RyaW5nKSB7XG4gICAgaWYgKHdzcy5pbmRleE9mKFwiczovL1wiKSA9PT0gLTEpIHtcbiAgICAgIHdzcyA9IFwid3M6Ly9cIiArIHdzcztcbiAgICB9XG4gICAgdGhpcy5uZXQudXBkYXRlV3NzKHdzcylcbiAgfVxuXG4gIHB1YmxpYyBzZXRQdXNoQ2FsbGJhY2soY2xiIDoocmVzOlJlc3VsdCk9PnZvaWQpIHtcbiAgICB0aGlzLm9uUHVzaCA9IGNsYjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQZWVyQ2xvc2VkQ2FsbGJhY2soY2xiIDooKT0+dm9pZCkge1xuICAgIHRoaXMub25QZWVyQ2xvc2VkID0gY2xiO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNlbmQoZGF0YTogQXJyYXlCdWZmZXIgfCBzdHJpbmcsIGhlYWRlcj86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAgOiBQcm9taXNlPFtSZXN1bHQsIEVycm9yIHwgbnVsbF0+IHtcblxuICAgIGxldCBlcnIgPSBhd2FpdCB0aGlzLm5ldC5Db25uZWN0KCk7XG4gICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gW2VtcHR5UmVzdWx0LCBuZXcgQ29ubkVycm9yKGVycildO1xuICAgIH1cblxuICAgIGxldCByZXEgPSBuZXcgUmVxdWVzdChkYXRhLCBoZWFkZXIpO1xuICAgIGxldCByZXFJZCA9IHRoaXMucmVxSWQrKztcbiAgICByZXEuU2V0UmVxSWQocmVxSWQpO1xuXG4gICAgbGV0IHRpbWVyOm51bWJlcnx1bmRlZmluZWRcbiAgICBsZXQgcmVzID0gbmV3IFByb21pc2U8W1Jlc3VsdCwgRXJyb3IgfCBudWxsXT4oXG4gICAgICAocmVzb2x2ZTogKHJldDogW1Jlc3VsdCwgRXJyb3IgfCBudWxsIF0pID0+IHZvaWQpID0+IHtcbiAgICAgICAgdGhpcy5hbGxSZXEuc2V0KHJlcUlkLCAocmVzdWx0KT0+e1xuICAgICAgICAgIGlmICh0aW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXN1bHQuZXJyICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXNvbHZlKFtlbXB0eVJlc3VsdCwgcmVzdWx0LmVycl0pO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJlcyA9IHJlc3VsdC5yZXNcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gU3RhdHVzLk9rKSB7XG4gICAgICAgICAgICByZXNvbHZlKFtlbXB0eVJlc3VsdCwgbmV3IEVycm9yKG5ldyBVdGY4KHJlcy5kYXRhKCkpLnRvU3RyaW5nKCkpXSk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKFtuZXcgUmVzdWx0KHJlcy5kYXRhKCkpLCBudWxsXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgIHRoaXMuYWxsUmVxLmRlbGV0ZShyZXFJZClcbiAgICAgICAgICByZXNvbHZlKFtlbXB0eVJlc3VsdCwgbmV3IEVycm9yKFwidGltZW91dFwiKV0pO1xuICAgICAgICB9LCB0aGlzLm9wLnJlcXVlc3RUaW1lb3V0L01pbGxpc2Vjb25kKWFzIHVua25vd24gYXMgbnVtYmVyO1xuICAgICAgfSlcblxuICAgIGVyciA9IGF3YWl0IHRoaXMubmV0LldyaXRlKHJlcS5Ub0RhdGEoKSk7XG4gICAgLy8g5ZCR572R57uc5YaZ5pWw5o2u5aSx6LSl77yM5Lmf5bqU6K+l5b2S5Li66L+e5o6l5bGC55qE6ZSZ6K+vXG4gICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFsbFJlcS5kZWxldGUocmVxSWQpXG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtlbXB0eVJlc3VsdCwgbmV3IENvbm5FcnJvcihlcnIpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVjb3ZlcigpOiBQcm9taXNlPEVycm9yfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQuQ29ubmVjdCgpO1xuICB9XG59XG5cbiIsIlxuZXhwb3J0IGludGVyZmFjZSBFdmVudCB7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgcmVhZG9ubHkgZGF0YTogQXJyYXlCdWZmZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbG9zZUV2ZW50IGV4dGVuZHMgRXZlbnR7XG4gIHJlYWRvbmx5IGNvZGU6IG51bWJlcjtcbiAgcmVhZG9ubHkgcmVhc29uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JFdmVudCBleHRlbmRzIEV2ZW50e1xuICBlcnJNc2c6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlNvY2tldEludGVyZmFjZSB7XG4gIG9uY2xvc2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogQ2xvc2VFdmVudCkgPT4gYW55KTtcbiAgb25lcnJvcjogKCh0aGlzOiBXZWJTb2NrZXRJbnRlcmZhY2UsIGV2OiBFcnJvckV2ZW50KSA9PiBhbnkpO1xuICBvbm1lc3NhZ2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogTWVzc2FnZUV2ZW50KSA9PiBhbnkpO1xuICBvbm9wZW46ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXZlbnQpID0+IGFueSk7XG5cbiAgY2xvc2UoY29kZT86IG51bWJlciwgcmVhc29uPzogc3RyaW5nKTogdm9pZDtcbiAgc2VuZChkYXRhOiBBcnJheUJ1ZmZlcik6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2ViU29ja2V0Q29uc3RydWN0b3Ige1xuICBuZXcgKHVybDogc3RyaW5nKTogV2ViU29ja2V0SW50ZXJmYWNlXG59XG5cbmV4cG9ydCBjbGFzcyBEdW1teVdzIGltcGxlbWVudHMgV2ViU29ja2V0SW50ZXJmYWNle1xuICBvbmNsb3NlID0gKCk9Pnt9XG4gIG9uZXJyb3IgPSAoKT0+e31cbiAgb25tZXNzYWdlID0gKCk9Pnt9XG4gIG9ub3BlbiA9ICgpPT57fVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICB9XG5cbiAgc2VuZCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3Qgc2V0IFdlYlNvY2tldENvbnN0cnVjdG9yXCIpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuXG4gIHByaXZhdGUgbWF4Q29uY3VycmVudCA6IG51bWJlciA9IDU7XG4gIHByaXZhdGUgbWF4Qnl0ZXM6IG51bWJlciA9IDQgKiAxMDI0ICogMTAyNDtcbiAgcHJpdmF0ZSBjb25uZWN0SUQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgcHVibGljIG9uY2xvc2U6ICgoZXY6IENsb3NlRXZlbnQpID0+IGFueSkgPSAoKT0+e307XG4gIHB1YmxpYyBvbmVycm9yOiAoKGV2OiBFcnJvckV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuICBwdWJsaWMgb25tZXNzYWdlOiAoKGV2OiBNZXNzYWdlRXZlbnQpID0+IGFueSkgPSAoKT0+e307XG4gIHB1YmxpYyBvbm9wZW46ICgoZXY6IEV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuXG4gIHByaXZhdGUgd2FpdGluZ1NlbmQgPSBuZXcgQXJyYXk8QXJyYXlCdWZmZXI+KClcbiAgcHJpdmF0ZSBjb25jdXJyZW50ID0gMFxuXG4gIHByaXZhdGUgd2Vic29ja2V0OiBXZWJTb2NrZXRJbnRlcmZhY2U7XG5cbiAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIHdlYnNvY2tldENvbnN0cnVjdG9yOiBXZWJTb2NrZXRDb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IHdlYnNvY2tldENvbnN0cnVjdG9yKHVybClcblxuICAgIHRoaXMud2Vic29ja2V0Lm9uY2xvc2UgPSAoZXY6IENsb3NlRXZlbnQpPT57XG4gICAgICB0aGlzLm9uY2xvc2UoZXYpXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9uZXJyb3IgPSAoZXY6IEVycm9yRXZlbnQpPT57XG4gICAgICB0aGlzLm9uZXJyb3IoZXYpXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IChyZXN1bHQ6IE1lc3NhZ2VFdmVudCk9PntcbiAgICAgIGxldCBlcnIgPSB0aGlzLnJlYWRIYW5kc2hha2UocmVzdWx0KVxuICAgICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKCk9Pnt9XG4gICAgICAgIHRoaXMud2Vic29ja2V0Lm9uZXJyb3IgPSAoKT0+e31cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQub25vcGVuID0gKCk9Pnt9XG4gICAgICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9ICgpPT57fVxuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgICAgIHRoaXMub25lcnJvcih7ZXJyTXNnOiBlcnIubWVzc2FnZX0pXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIOiuvue9ruS4uuecn+ato+eahOaOpeaUtuWHveaVsFxuICAgICAgdGhpcy53ZWJzb2NrZXQub25tZXNzYWdlID0gdGhpcy5vbm1lc3NhZ2VcblxuICAgICAgLy8g5o+h5omL57uT5p2f5omN5piv55yf5q2j55qEb25vcGVuXG4gICAgICB0aGlzLm9ub3Blbih7fSlcbiAgICB9XG4gICAgdGhpcy53ZWJzb2NrZXQub25vcGVuID0gKF86IEV2ZW50KT0+e1xuICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAgSGVhcnRCZWF0X3MgfCBGcmFtZVRpbWVvdXRfcyB8IE1heENvbmN1cnJlbnQgfCBNYXhCeXRlcyB8IGNvbm5lY3QgaWRcbiAgICBIZWFydEJlYXRfczogMiBieXRlcywgbmV0IG9yZGVyXG4gICAgRnJhbWVUaW1lb3V0X3M6IDEgYnl0ZSAgPT09MFxuICAgIE1heENvbmN1cnJlbnQ6IDEgYnl0ZVxuICAgIE1heEJ5dGVzOiA0IGJ5dGVzLCBuZXQgb3JkZXJcbiAgICBjb25uZWN0IGlkOiA4IGJ5dGVzLCBuZXQgb3JkZXJcbiovXG4gIHByaXZhdGUgcmVhZEhhbmRzaGFrZShyZXN1bHQ6IE1lc3NhZ2VFdmVudCk6IEVycm9yIHwgbnVsbCB7XG4gICAgbGV0IGJ1ZmZlciA9IHJlc3VsdC5kYXRhXG4gICAgaWYgKGJ1ZmZlci5ieXRlTGVuZ3RoICE9IDE2KSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFwibGVuKGhhbmRzaGFrZSkgIT0gMTZcIilcbiAgICB9XG5cbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuXG4gICAgdGhpcy5tYXhDb25jdXJyZW50ID0gdmlldy5nZXRVaW50OCgzKTtcbiAgICB0aGlzLm1heEJ5dGVzID0gdmlldy5nZXRVaW50MzIoNCk7XG4gICAgdGhpcy5jb25uZWN0SUQgPSAoXCIwMDAwMDAwMFwiICsgdmlldy5nZXRVaW50MzIoOCkudG9TdHJpbmcoMTYpKS5zbGljZSgtOCkgK1xuICAgICAgKFwiMDAwMDAwMDBcIiArIHZpZXcuZ2V0VWludDMyKDEyKS50b1N0cmluZygxNikpLnNsaWNlKC04KTtcbiAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RJRCA9IFwiLCB0aGlzLmNvbm5lY3RJRClcblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBwdWJsaWMgcmVjZWl2ZWRPbmVSZXNwb25zZSgpOnZvaWQge1xuICAgIHRoaXMuY29uY3VycmVudC0tXG4gICAgLy8g6Ziy5b6h5oCn5Luj56CBXG4gICAgaWYgKHRoaXMuY29uY3VycmVudCA8IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihcImNvbm5lY3Rpb24uY29uY3VycmVudCA8IDBcIilcbiAgICAgIHRoaXMuY29uY3VycmVudCA9IDBcbiAgICB9XG5cbiAgICB0aGlzLl9zZW5kKClcbiAgfVxuXG4gIHByaXZhdGUgX3NlbmQoKTp2b2lkIHtcbiAgICBpZiAodGhpcy5jb25jdXJyZW50ID4gdGhpcy5tYXhDb25jdXJyZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy53YWl0aW5nU2VuZC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jb25jdXJyZW50KytcblxuICAgIHRoaXMud2Vic29ja2V0LnNlbmQodGhpcy53YWl0aW5nU2VuZC5zaGlmdCgpISlcbiAgfVxuXG4gIHB1YmxpYyBzZW5kKGRhdGE6IEFycmF5QnVmZmVyKTogRXJyb3IgfCBudWxsIHtcbiAgICBpZiAoZGF0YS5ieXRlTGVuZ3RoID4gdGhpcy5tYXhCeXRlcykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcImRhdGEgaXMgdG9vIGxhcmdlISBNdXN0IGJlIGxlc3MgdGhhbiBcIiArIHRoaXMubWF4Qnl0ZXMudG9TdHJpbmcoKSArIFwiLiBcIilcbiAgICB9XG5cbiAgICB0aGlzLndhaXRpbmdTZW5kLnB1c2goZGF0YSlcbiAgICB0aGlzLl9zZW5kKClcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcHVibGljIFNlbmRGb3JjZShkYXRhOiBBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMud2Vic29ja2V0LnNlbmQoZGF0YSlcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpXG4gIH1cbn1cbiIsIlxuXG5leHBvcnQgY2xhc3MgQ29ubkVycm9yIGltcGxlbWVudHMgRXJyb3J7XG4gIG1lc3NhZ2U6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3RhY2s/OiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihlcnJvcjogRXJyb3IpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlXG4gICAgdGhpcy5uYW1lID0gZXJyb3IubmFtZVxuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFja1xuICB9XG59IiwiXG4vKipcblxuIGNvbnRlbnQgcHJvdG9jb2w6XG4gICByZXF1ZXN0IC0tLVxuICAgICByZXFpZCB8IGhlYWRlcnMgfCBoZWFkZXItZW5kLWZsYWcgfCBkYXRhXG4gICAgIHJlcWlkOiA0IGJ5dGVzLCBuZXQgb3JkZXI7XG4gICAgIGhlYWRlcnM6IDwga2V5LWxlbiB8IGtleSB8IHZhbHVlLWxlbiB8IHZhbHVlID4gLi4uIDsgIFtvcHRpb25hbF1cbiAgICAga2V5LWxlbjogMSBieXRlLCAga2V5LWxlbiA9IHNpemVvZihrZXkpO1xuICAgICB2YWx1ZS1sZW46IDEgYnl0ZSwgdmFsdWUtbGVuID0gc2l6ZW9mKHZhbHVlKTtcbiAgICAgaGVhZGVyLWVuZC1mbGFnOiAxIGJ5dGUsID09PSAwO1xuICAgICBkYXRhOiAgICAgICBbb3B0aW9uYWxdXG5cbiAgICAgIHJlcWlkID0gMTogY2xpZW50IHB1c2ggYWNrIHRvIHNlcnZlci5cbiAgICAgICAgICAgIGFjazogbm8gaGVhZGVycztcbiAgICAgICAgICAgIGRhdGE6IHB1c2hJZC4gNCBieXRlcywgbmV0IG9yZGVyO1xuXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICByZXNwb25zZSAtLS1cbiAgICAgcmVxaWQgfCBzdGF0dXMgfCBkYXRhXG4gICAgIHJlcWlkOiA0IGJ5dGVzLCBuZXQgb3JkZXI7XG4gICAgIHN0YXR1czogMSBieXRlLCAwLS0tc3VjY2VzcywgMS0tLWZhaWxlZFxuICAgICBkYXRhOiBpZiBzdGF0dXM9PXN1Y2Nlc3MsIGRhdGE9PGFwcCBkYXRhPiAgICBbb3B0aW9uYWxdXG4gICAgIGlmIHN0YXR1cz09ZmFpbGVkLCBkYXRhPTxlcnJvciByZWFzb24+XG5cblxuICAgIHJlcWlkID0gMTogc2VydmVyIHB1c2ggdG8gY2xpZW50XG4gICAgICAgIHN0YXR1czogMFxuICAgICAgICAgIGRhdGE6IGZpcnN0IDQgYnl0ZXMgLS0tIHB1c2hJZCwgbmV0IG9yZGVyO1xuICAgICAgICAgICAgICAgIGxhc3QgLS0tIHJlYWwgZGF0YVxuXG4gKi9cblxuaW1wb3J0IHtVdGY4fSBmcm9tIFwiLi91dGY4XCI7XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSByZWFkb25seSBidWZmZXI6IEFycmF5QnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6QXJyYXlCdWZmZXJ8c3RyaW5nLCBoZWFkZXI/Ok1hcDxzdHJpbmcsc3RyaW5nPikge1xuICAgIGxldCBsZW4gPSA0O1xuICAgIGhlYWRlciA9IGhlYWRlciB8fCBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gICAgbGV0IGhlYWRlckFyciA9IG5ldyBBcnJheTx7a2V5OlV0ZjgsIHZhbHVlOlV0Zjh9PigpO1xuXG4gICAgaGVhZGVyLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nLCBfOiBNYXA8c3RyaW5nLCBzdHJpbmc+KT0+e1xuICAgICAgbGV0IHV0ZjggPSB7a2V5OiBuZXcgVXRmOChrZXkpLCB2YWx1ZTogbmV3IFV0ZjgodmFsdWUpfTtcbiAgICAgIGhlYWRlckFyci5wdXNoKHV0ZjgpO1xuICAgICAgbGVuICs9IDEgKyB1dGY4LmtleS5ieXRlTGVuZ3RoICsgMSArIHV0ZjgudmFsdWUuYnl0ZUxlbmd0aDtcbiAgICB9KTtcblxuICAgIGxldCBib2R5ID0gbmV3IFV0ZjgoZGF0YSk7XG5cbiAgICBsZW4gKz0gMSArIGJvZHkuYnl0ZUxlbmd0aDtcblxuICAgIHRoaXMuYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGxlbik7XG5cbiAgICBsZXQgcG9zID0gNDtcbiAgICBmb3IgKGxldCBoIG9mIGhlYWRlckFycikge1xuICAgICAgKG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcikpLnNldFVpbnQ4KHBvcywgaC5rZXkuYnl0ZUxlbmd0aCk7XG4gICAgICBwb3MrKztcbiAgICAgIChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLnNldChoLmtleS5yYXcsIHBvcyk7XG4gICAgICBwb3MgKz0gaC5rZXkuYnl0ZUxlbmd0aDtcbiAgICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50OChwb3MsIGgudmFsdWUuYnl0ZUxlbmd0aCk7XG4gICAgICBwb3MrKztcbiAgICAgIChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLnNldChoLnZhbHVlLnJhdywgcG9zKTtcbiAgICAgIHBvcyArPSBoLnZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50OChwb3MsIDApO1xuICAgIHBvcysrO1xuXG4gICAgKG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyKSkuc2V0KGJvZHkucmF3LCBwb3MpO1xuICB9XG5cbiAgcHVibGljIFNldFJlcUlkKGlkOm51bWJlcikge1xuICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50MzIoMCwgaWQpO1xuICB9XG5cbiAgcHVibGljIFRvRGF0YSgpOkFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxuXG59XG5cbmV4cG9ydCBlbnVtIFN0YXR1cyB7XG4gIE9rLFxuICBGYWlsZWRcbn1cblxuZXhwb3J0IGNsYXNzIFJlc3BvbnNlIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgc3RhdHVzOiBTdGF0dXM7XG4gIHByaXZhdGUgcmVhZG9ubHkgYnVmZmVyOiBVaW50OEFycmF5O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgdGhpcy5zdGF0dXMgPSB0aGlzLmJ1ZmZlcls0XSA9PSAwP1N0YXR1cy5PayA6IFN0YXR1cy5GYWlsZWQ7XG4gIH1cblxuICBwdWJsaWMgcmVxSUQoKTpudW1iZXIge1xuICAgIHJldHVybiAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLmJ1ZmZlcikpLmdldFVpbnQzMigwKTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhKCk6QXJyYXlCdWZmZXIge1xuXG4gICAgbGV0IG9mZnNldCA9IDVcbiAgICBpZiAodGhpcy5pc1B1c2goKSkge1xuICAgICAgLy8gcHVzaElkXG4gICAgICBvZmZzZXQgKz0gNFxuICAgIH1cblxuICAgIGlmICh0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoIDw9IG9mZnNldCkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5zbGljZShvZmZzZXQpLmJ1ZmZlclxuICAgIC8vIGxldCB1dGY4ID0gbmV3IFV0ZjgodGhpcy5idWZmZXIuc2xpY2Uob2Zmc2V0KSk7XG4gICAgLy8gcmV0dXJuIHV0ZjgudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1B1c2goKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yZXFJRCgpID09PSAxO1xuICB9XG5cbiAgcHVibGljIG5ld1B1c2hBY2soKTogQXJyYXlCdWZmZXIge1xuICAgIGlmICghdGhpcy5pc1B1c2goKSB8fCB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoIDw9IDQrMSs0KSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBBcnJheUJ1ZmZlcig0ICsgMSArIDQpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcocmV0KVxuICAgIHZpZXcuc2V0VWludDMyKDAsIDEpXG4gICAgdmlldy5zZXRVaW50OCg0LCAwKVxuICAgIHZpZXcuc2V0VWludDMyKDUsIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIuYnVmZmVyKSkuZ2V0VWludDMyKDUpKVxuXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tRXJyb3IocmVxSWQ6bnVtYmVyLCBlcnI6IEVycm9yKTpSZXNwb25zZSB7XG4gICAgbGV0IHV0ZjggPSBuZXcgVXRmOChlcnIubWVzc2FnZSk7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDQrMSArIHV0ZjguYnl0ZUxlbmd0aCk7XG4gICAgKG5ldyBEYXRhVmlldyhidWZmZXIuYnVmZmVyKSkuc2V0VWludDMyKDAsIHJlcUlkKTtcbiAgICBidWZmZXJbNF0gPSAxO1xuICAgIGJ1ZmZlci5zZXQodXRmOC5yYXcsIDUpO1xuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShidWZmZXIpO1xuICB9XG59XG4iLCJpbXBvcnQge0R1cmF0aW9uLCBNaWxsaXNlY29uZH0gZnJvbSBcInRzLXh1dGlsc1wiXG5pbXBvcnQge0Nvbm5lY3Rpb24sIE1lc3NhZ2VFdmVudCwgQ2xvc2VFdmVudCwgRXJyb3JFdmVudCwgV2ViU29ja2V0Q29uc3RydWN0b3J9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIlxuXG5cbmludGVyZmFjZSBOZXRIYW5kbGUge1xuICBvbk1lc3NhZ2UodmFsdWU6IEFycmF5QnVmZmVyKTogdm9pZDtcblxuICBvbkNsb3NlKHJlc3VsdDogQ2xvc2VFdmVudCk6IHZvaWRcblxuICBvbkVycm9yPzogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgY2xhc3MgTmV0IHtcblxuICBwcml2YXRlIGNvbm46IENvbm5lY3Rpb24gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3YWl0aW5nQ29ubmVjdDogQXJyYXk8KHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkPiA9IG5ldyBBcnJheTwocmV0OiBFcnJvciB8IG51bGwpID0+IHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3c3M6IHN0cmluZywgcHJpdmF0ZSBjb25uZWN0VGltZW91dDogRHVyYXRpb25cbiAgICAgICAgICAgICAgLCBwcml2YXRlIHdlYlNvY2tldENvbnN0cnVjdG9yOiBXZWJTb2NrZXRDb25zdHJ1Y3RvclxuICAgICAgICAgICAgICAsIHByaXZhdGUgaGFuZGxlOiBOZXRIYW5kbGUpIHtcbiAgfVxuXG4gIHByaXZhdGUgZG9XYWl0aW5nQ29ubmVjdChlcnI6IEVycm9yIHwgbnVsbCkge1xuICAgIGZvciAobGV0IHdhaXRpbmcgb2YgdGhpcy53YWl0aW5nQ29ubmVjdCkge1xuICAgICAgd2FpdGluZyhlcnIpXG4gICAgfVxuICAgIHRoaXMud2FpdGluZ0Nvbm5lY3QgPSBuZXcgQXJyYXk8KHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkPigpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnZhbGlkV2Vic29ja2V0KCkge1xuICAgIHRoaXMuY29ubiEub25tZXNzYWdlID0gKCkgPT4ge31cbiAgICB0aGlzLmNvbm4hLm9ub3BlbiA9ICgpID0+IHt9XG4gICAgdGhpcy5jb25uIS5vbmNsb3NlID0gKCkgPT4ge31cbiAgICB0aGlzLmNvbm4hLm9uZXJyb3IgPSAoKSA9PiB7fVxuICAgIHRoaXMuY29ubiA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlV3NzKHdzczogc3RyaW5nKSB7XG4gICAgdGhpcy53c3MgPSB3c3NcbiAgfVxuXG4gIC8vIOmHh+eUqOacgOWkmuWPquacieS4gOadoei/nuaOpeWkhOS6jua0u+i3g+eKtuaAgeeahOetlueVpe+8iOWMheaLrO+8mmNvbm5lY3RpbmcvY29ubmVjdC9jbG9zaW5nKe+8jOi/nuaOpeeahOWIpOivu+WPr+S7peWNleS4gOWMlu+8jOWvueS4iuWxguaatOmcsueahOiwg+eUqOWPr+S7peeugOWNleWMluOAglxuICAvLyDkvYblr7nkuIDkupvmnoHpmZDmk43kvZzlj6/og73lhbfmnInmu57lkI7mgKfvvIzmr5TlpoLmraPlpITkuo5jbG9zaW5n55qE5pe25YCZKOS7o+eggeW8guatpeaJp+ihjOS4rSnvvIzmlrDnmoRDb25uZWN06LCD55So5LiN6IO956uL5Y2z6L+e5o6l44CC5Li65LqG5bC95Y+v6IO955qE6YG/5YWN6L+Z56eN5oOF5Ya177yMXG4gIC8vIOWcqG9uZXJyb3Ig5Y+KIG9uY2xvc2Ug5Lit6YO95L2/55So5LqG5ZCM5q2l5Luj56CB44CCXG4gIC8vIOWQjuacn+WmguaenOmHh+eUqOWkmuadoea0u+i3g+eKtuaAgeeahOetlueVpSjmr5TlpoLvvJrkuIDmnaFjbG9zaW5n77yM5LiA5p2hY29ubmVjdGluZynvvIzpnIDopoHogIPomZFuZXQuaGFuZGxl55qE5a6a5LmJ5Y+K5byC5q2l5oOF5Ya155qE5pe25bqP6Zeu6aKY44CCXG4gIHB1YmxpYyBhc3luYyBDb25uZWN0KCk6IFByb21pc2U8RXJyb3IgfCBudWxsPiB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxFcnJvciB8IG51bGw+KChyZXNvbHZlOiAocmV0OiBFcnJvciB8IG51bGwpID0+IHZvaWQpID0+IHtcbiAgICAgIHRoaXMud2FpdGluZ0Nvbm5lY3QucHVzaChyZXNvbHZlKTtcbiAgICAgIGlmICh0aGlzLmNvbm4gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAvLyBpbnZhbGlkIHRoaXMud2Vic29ja2V0XG4gICAgICAgIHRoaXMuaW52YWxpZFdlYnNvY2tldCgpXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG5ldyBFcnJvcihcImNvbm5lY3QgdGltZW91dFwiKSlcbiAgICAgIH0sIHRoaXMuY29ubmVjdFRpbWVvdXQvTWlsbGlzZWNvbmQpXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuY29ubiA9IG5ldyBDb25uZWN0aW9uKHRoaXMud3NzLCB0aGlzLndlYlNvY2tldENvbnN0cnVjdG9yKTtcbiAgICAgIH1jYXRjaCAoZSkge1xuICAgICAgICAvLyDnm67liY3op4LmtYvliLDvvJox44CB5aaC5p6cdXJs5YaZ6ZSZ77yM5YiZ5piv55u05o6l5ZyobmV35bCx5Lya5oqb5Ye65byC5bi477ybMuOAgeWmguaenOaYr+ecn+ato+eahOi/nuaOpeWksei0pe+8jOWImeS8muinpuWPkW9uZXJyb3LvvIzlkIzml7bov5jkvJrop6blj5FvbmNsb3NlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aGlzLmRvV2FpdGluZ0Nvbm5lY3QobmV3IEVycm9yKGUgYXMgc3RyaW5nKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSAocmVzdWx0OiBNZXNzYWdlRXZlbnQpPT57XG4gICAgICAgIHRoaXMuaGFuZGxlLm9uTWVzc2FnZShyZXN1bHQuZGF0YSlcbiAgICAgIH07XG4gICAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG51bGwpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gKHJlc3VsdDogQ2xvc2VFdmVudCkgPT4ge1xuICAgICAgICAvLyDmraTlpITlj6rogIPomZHov5jlpITkuo7ov57mjqXnmoTmg4XlhrXvvIzlhbbku5bmg4XlhrXlj6/ku6Xlj4Lop4Egb25lcnJvcueahOWkhOeQhlxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xvc2VFdmVudCA9IHtjb2RlOnJlc3VsdC5jb2RlLCByZWFzb246IHJlc3VsdC5yZWFzb259XG4gICAgICAgIGlmIChjbG9zZUV2ZW50LnJlYXNvbiA9PT0gXCJcIiB8fCBjbG9zZUV2ZW50LnJlYXNvbiA9PT0gdW5kZWZpbmVkIHx8IGNsb3NlRXZlbnQucmVhc29uID09PSBudWxsKSB7XG4gICAgICAgICAgY2xvc2VFdmVudC5yZWFzb24gPSBcInVua25vd25cIlxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcIm5ldC0tLW9uQ2xvc2VkLCBcIiwgSlNPTi5zdHJpbmdpZnkoY2xvc2VFdmVudCkpO1xuICAgICAgICB0aGlzLmhhbmRsZS5vbkNsb3NlKGNsb3NlRXZlbnQpO1xuICAgICAgICB0aGlzLmNvbm4/LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmNvbm4ub25lcnJvciA9IChyZXN1bHQ6IEVycm9yRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm5ldC0tLW9uRXJyb3JcIiwgcmVzdWx0KTtcbiAgICAgICAgLy8g6ZyA6KaB6ICD6JmR6L+e5o6l5aSx6LSl55qE6Ziy5b6h5oCn5Luj56CB77yMd2Vic29ja2V05o6l5Y+j5rKh5pyJ5piO56Gu5oyH5Ye66L+e5o6l5aSx6LSl55Sx5ZOq5Liq5o6l5Y+j6L+U5Zue77yM5pWF6L+Z6YeM5Yqg5LiK6L+e5o6l5aSx6LSl55qE5aSE55CGXG4gICAgICAgIC8vIOebruWJjeingua1i+WIsO+8mjHjgIHlpoLmnpx1cmzlhpnplJnvvIzliJnmmK/nm7TmjqXlnKhuZXflsLHkvJrmipvlh7rlvILluLjvvJsy44CB5aaC5p6c5piv55yf5q2j55qE6L+e5o6l5aSx6LSl77yM5YiZ5Lya6Kem5Y+Rb25lcnJvcu+8jOWQjOaXtui/mOS8muinpuWPkW9uY2xvc2VcblxuICAgICAgICAvLyDmsqHmnInlvIDlp4vov57mjqXmiJbogIXlhbbku5bku7vkvZXmg4XlhrXpgKDmiJB0aGlzLmNvbm7ooqvnva7kuLrnqbrvvIzpg73nm7TmjqXov5Tlm55cbiAgICAgICAgaWYgKHRoaXMuY29ubiA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5ZON5bqU5LqGb25lcnJvciDlsLHkuI3lho3lk43lupRvbmNsb3NlXG4gICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gKCk9Pnt9XG5cbiAgICAgICAgLy8g55uu5YmN5YGa5aaC5LiL55qE6K6+5a6a77ya5LiA5Liq5LiK5bGC55qEcGVuZGluZ+iwg+eUqCjov57mjqXmiJbogIXor7fmsYLnrYkp77yM6KaB5LmI5piv5Zyo562J5b6F6L+e5o6l5LitXG4gICAgICAgIC8vIOimgeS5iOaYr+WcqOetieW+hXJlc3BvbnNl5Lit44CC5Y2z5L2/5Ye6546w5byC5bi477yM5LiK5bGC5LiA6Iis5Y+v6IO96YO95pyJ6LaF5pe277yM5LuN5LiN5Lya5LiA55u06KKrcGVuZGluZ1xuICAgICAgICAvLyB0b2RvOiDmmK/lkKbkvJrmnInlkIzml7blh7rnjrDlnKgg562J6L+e5o6lIOS4jiDnrYnlk43lupQg5Lit77yfXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG5ldyBFcnJvcihyZXN1bHQuZXJyTXNnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGUub25DbG9zZSh7Y29kZTogLTEsIHJlYXNvbjogXCJvbmVycm9yOiBcIiArIHJlc3VsdC5lcnJNc2d9KTtcbiAgICAgICAgICBpZiAodGhpcy5oYW5kbGUub25FcnJvcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUub25FcnJvcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29ubj8uY2xvc2UoKTtcbiAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBXcml0ZShkYXRhOiBBcnJheUJ1ZmZlcik6IEVycm9yIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuY29ubiA9PSBudWxsIHx8ICF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIm5vdCBjb25uZWN0ZWRcIilcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb25uLnNlbmQoZGF0YSlcbiAgfVxuXG4gIHB1YmxpYyBXcml0ZUZvcmNlKGRhdGE6IEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5jb25uPy5TZW5kRm9yY2UoZGF0YSlcbiAgfVxuXG4gIHB1YmxpYyByZWNlaXZlZE9uZVJlc3BvbnNlKCk6dm9pZCB7XG4gICAgdGhpcy5jb25uPy5yZWNlaXZlZE9uZVJlc3BvbnNlKClcbiAgfVxuXG59IiwiaW1wb3J0IHtEdXJhdGlvbiwgU2Vjb25kfSBmcm9tIFwidHMteHV0aWxzXCJcbmltcG9ydCB7RHVtbXlXcywgV2ViU29ja2V0Q29uc3RydWN0b3J9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIlxuXG5leHBvcnQgY2xhc3Mgb3B0aW9uIHtcbiAgcmVxdWVzdFRpbWVvdXQ6IER1cmF0aW9uID0gMzAqU2Vjb25kXG4gIGNvbm5lY3RUaW1lb3V0OiBEdXJhdGlvbiA9IDMwKlNlY29uZFxuICB3ZWJTb2NrZXRDb25zdHJ1Y3RvcjogV2ViU29ja2V0Q29uc3RydWN0b3IgPSBEdW1teVdzXG59XG5cbmV4cG9ydCB0eXBlIE9wdGlvbiA9IChvcCA6b3B0aW9uKT0+dm9pZDtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlcXVlc3RUaW1lb3V0KGQgOiBEdXJhdGlvbik6IE9wdGlvbiB7XG4gIHJldHVybiAob3AgOm9wdGlvbikgPT4ge1xuICAgIG9wLnJlcXVlc3RUaW1lb3V0ID0gZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25uZWN0VGltZW91dChkIDpEdXJhdGlvbik6IE9wdGlvbiB7XG4gIHJldHVybiAob3AgOm9wdGlvbikgPT4ge1xuICAgIG9wLmNvbm5lY3RUaW1lb3V0ID0gZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBXZWJTb2NrZXQod2ViU29ja2V0Q29uc3RydWN0b3I6IFdlYlNvY2tldENvbnN0cnVjdG9yKTogT3B0aW9uIHtcbiAgcmV0dXJuIChvcCA6b3B0aW9uKSA9PiB7XG4gICAgb3Aud2ViU29ja2V0Q29uc3RydWN0b3IgPSB3ZWJTb2NrZXRDb25zdHJ1Y3RvclxuICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBVdGY4IHtcbiAgcHVibGljIHJlYWRvbmx5IHJhdzogVWludDhBcnJheTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmRleGVzOiBBcnJheTxudW1iZXI+O1xuICBwcml2YXRlIHJlYWRvbmx5IHN0cjpzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBieXRlTGVuZ3RoOm51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGxlbmd0aDpudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IEFycmF5QnVmZmVyfHN0cmluZykge1xuICAgIHRoaXMuaW5kZXhlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnJhdyA9IG5ldyBVaW50OEFycmF5KGlucHV0KTtcbiAgICAgIHRoaXMuc3RyID0gXCJcIlxuICAgICAgbGV0IHV0ZjhpID0gMDtcbiAgICAgIHdoaWxlICh1dGY4aSA8IHRoaXMucmF3Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmluZGV4ZXMucHVzaCh1dGY4aSk7XG4gICAgICAgIGxldCBjb2RlID0gVXRmOC5sb2FkVVRGOENoYXJDb2RlKHRoaXMucmF3LCB1dGY4aSk7XG4gICAgICAgIHRoaXMuc3RyICs9IFN0cmluZy5mcm9tQ29kZVBvaW50KGNvZGUpXG4gICAgICAgIHV0ZjhpICs9IFV0ZjguZ2V0VVRGOENoYXJMZW5ndGgoY29kZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmluZGV4ZXMucHVzaCh1dGY4aSk7ICAvLyBlbmQgZmxhZ1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0ciA9IGlucHV0O1xuXG4gICAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICAgIGZvciAobGV0IGNoIG9mIGlucHV0KSB7XG4gICAgICAgIGxlbmd0aCArPSBVdGY4LmdldFVURjhDaGFyTGVuZ3RoKGNoLmNvZGVQb2ludEF0KDApISlcbiAgICAgIH1cbiAgICAgIHRoaXMucmF3ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcblxuICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgIGZvciAobGV0IGNoIG9mIGlucHV0KSB7XG4gICAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgaW5kZXggPSBVdGY4LnB1dFVURjhDaGFyQ29kZSh0aGlzLnJhdywgY2guY29kZVBvaW50QXQoMCkhLCBpbmRleClcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKGluZGV4KTsgLy8gZW5kIGZsYWdcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuaW5kZXhlcy5sZW5ndGggLSAxO1xuICAgIHRoaXMuYnl0ZUxlbmd0aCA9IHRoaXMucmF3LmJ5dGVMZW5ndGg7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGxvYWRVVEY4Q2hhckNvZGUoYUNoYXJzOiBVaW50OEFycmF5LCBuSWR4OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgbGV0IG5MZW4gPSBhQ2hhcnMubGVuZ3RoLCBuUGFydCA9IGFDaGFyc1tuSWR4XTtcblxuICAgIHJldHVybiBuUGFydCA+IDI1MSAmJiBuUGFydCA8IDI1NCAmJiBuSWR4ICsgNSA8IG5MZW4gP1xuICAgICAgLyogKG5QYXJ0IC0gMjUyIDw8IDMwKSBtYXkgYmUgbm90IHNhZmUgaW4gRUNNQVNjcmlwdCEgU28uLi46ICovXG4gICAgICAvKiBzaXggYnl0ZXMgKi8gKG5QYXJ0IC0gMjUyKSAqIDEwNzM3NDE4MjQgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAyNClcbiAgICAgICsgKGFDaGFyc1tuSWR4ICsgMl0gLSAxMjggPDwgMTgpICsgKGFDaGFyc1tuSWR4ICsgM10gLSAxMjggPDwgMTIpXG4gICAgICArIChhQ2hhcnNbbklkeCArIDRdIC0gMTI4IDw8IDYpICsgYUNoYXJzW25JZHggKyA1XSAtIDEyOFxuICAgICAgOiBuUGFydCA+IDI0NyAmJiBuUGFydCA8IDI1MiAmJiBuSWR4ICsgNCA8IG5MZW4gP1xuICAgICAgICAvKiBmaXZlIGJ5dGVzICovIChuUGFydCAtIDI0OCA8PCAyNCkgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAxOClcbiAgICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCAxMikgKyAoYUNoYXJzW25JZHggKyAzXSAtIDEyOCA8PCA2KVxuICAgICAgICArIGFDaGFyc1tuSWR4ICsgNF0gLSAxMjhcbiAgICAgICAgOiBuUGFydCA+IDIzOSAmJiBuUGFydCA8IDI0OCAmJiBuSWR4ICsgMyA8IG5MZW4gP1xuICAgICAgICAgIC8qIGZvdXIgYnl0ZXMgKi8oblBhcnQgLSAyNDAgPDwgMTgpICsgKGFDaGFyc1tuSWR4ICsgMV0gLSAxMjggPDwgMTIpXG4gICAgICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCA2KSArIGFDaGFyc1tuSWR4ICsgM10gLSAxMjhcbiAgICAgICAgICA6IG5QYXJ0ID4gMjIzICYmIG5QYXJ0IDwgMjQwICYmIG5JZHggKyAyIDwgbkxlbiA/XG4gICAgICAgICAgICAvKiB0aHJlZSBieXRlcyAqLyAoblBhcnQgLSAyMjQgPDwgMTIpICsgKGFDaGFyc1tuSWR4ICsgMV0gLSAxMjggPDwgNilcbiAgICAgICAgICAgICsgYUNoYXJzW25JZHggKyAyXSAtIDEyOFxuICAgICAgICAgICAgOiBuUGFydCA+IDE5MSAmJiBuUGFydCA8IDIyNCAmJiBuSWR4ICsgMSA8IG5MZW4gP1xuICAgICAgICAgICAgICAvKiB0d28gYnl0ZXMgKi8gKG5QYXJ0IC0gMTkyIDw8IDYpICsgYUNoYXJzW25JZHggKyAxXSAtIDEyOFxuICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgIC8qIG9uZSBieXRlICovIG5QYXJ0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcHV0VVRGOENoYXJDb2RlKGFUYXJnZXQ6IFVpbnQ4QXJyYXksIG5DaGFyOiBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgblB1dEF0OiBudW1iZXIpOm51bWJlciB7XG5cbiAgICBsZXQgbklkeCA9IG5QdXRBdDtcblxuICAgIGlmIChuQ2hhciA8IDB4ODAgLyogMTI4ICovKSB7XG4gICAgICAvKiBvbmUgYnl0ZSAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gbkNoYXI7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4ODAwIC8qIDIwNDggKi8pIHtcbiAgICAgIC8qIHR3byBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhjMCAvKiAxOTIgKi8gKyAobkNoYXIgPj4+IDYpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgaWYgKG5DaGFyIDwgMHgxMDAwMCAvKiA2NTUzNiAqLykge1xuICAgICAgLyogdGhyZWUgYnl0ZXMgKi9cbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ZTAgLyogMjI0ICovICsgKG5DaGFyID4+PiAxMik7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH0gZWxzZSBpZiAobkNoYXIgPCAweDIwMDAwMCAvKiAyMDk3MTUyICovKSB7XG4gICAgICAvKiBmb3VyIGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGYwIC8qIDI0MCAqLyArIChuQ2hhciA+Pj4gMTgpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxMikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gNikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKG5DaGFyICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4NDAwMDAwMCAvKiA2NzEwODg2NCAqLykge1xuICAgICAgLyogZml2ZSBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhmOCAvKiAyNDggKi8gKyAobkNoYXIgPj4+IDI0KTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTgpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDEyKSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiA2KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgLyogaWYgKG5DaGFyIDw9IDB4N2ZmZmZmZmYpICovIHsgLyogMjE0NzQ4MzY0NyAqL1xuICAgICAgLyogc2l4IGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGZjIC8qIDI1MiAqLyArIC8qIChuQ2hhciA+Pj4gMzApIG1heSBiZSBub3Qgc2FmZSBpbiBFQ01BU2NyaXB0ISBTby4uLjogKi8gKG5DaGFyIC8gMTA3Mzc0MTgyNCk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDI0KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxOCkgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTIpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH1cblxuICAgIHJldHVybiBuSWR4O1xuXG4gIH07XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0VVRGOENoYXJMZW5ndGgobkNoYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIG5DaGFyIDwgMHg4MCA/IDEgOiBuQ2hhciA8IDB4ODAwID8gMiA6IG5DaGFyIDwgMHgxMDAwMFxuICAgICAgPyAzIDogbkNoYXIgPCAweDIwMDAwMCA/IDQgOiBuQ2hhciA8IDB4NDAwMDAwMCA/IDUgOiA2O1xuICB9XG5cblxuICAvLyBwcml2YXRlIHN0YXRpYyBsb2FkVVRGMTZDaGFyQ29kZShhQ2hhcnM6IFVpbnQxNkFycmF5LCBuSWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAvL1xuICAvLyAgIC8qIFVURi0xNiB0byBET01TdHJpbmcgZGVjb2RpbmcgYWxnb3JpdGhtICovXG4gIC8vICAgbGV0IG5GcnN0Q2hyID0gYUNoYXJzW25JZHhdO1xuICAvL1xuICAvLyAgIHJldHVybiBuRnJzdENociA+IDB4RDdCRiAvKiA1NTIzMSAqLyAmJiBuSWR4ICsgMSA8IGFDaGFycy5sZW5ndGggP1xuICAvLyAgICAgKG5GcnN0Q2hyIC0gMHhEODAwIC8qIDU1Mjk2ICovIDw8IDEwKSArIGFDaGFyc1tuSWR4ICsgMV0gKyAweDI0MDAgLyogOTIxNiAqL1xuICAvLyAgICAgOiBuRnJzdENocjtcbiAgLy8gfVxuICAvL1xuICAvLyBwcml2YXRlIHN0YXRpYyBwdXRVVEYxNkNoYXJDb2RlKGFUYXJnZXQ6IFVpbnQxNkFycmF5LCBuQ2hhcjogbnVtYmVyLCBuUHV0QXQ6IG51bWJlcik6bnVtYmVyIHtcbiAgLy9cbiAgLy8gICBsZXQgbklkeCA9IG5QdXRBdDtcbiAgLy9cbiAgLy8gICBpZiAobkNoYXIgPCAweDEwMDAwIC8qIDY1NTM2ICovKSB7XG4gIC8vICAgICAvKiBvbmUgZWxlbWVudCAqL1xuICAvLyAgICAgYVRhcmdldFtuSWR4KytdID0gbkNoYXI7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIC8qIHR3byBlbGVtZW50cyAqL1xuICAvLyAgICAgYVRhcmdldFtuSWR4KytdID0gMHhEN0MwIC8qIDU1MjMyICovICsgKG5DaGFyID4+PiAxMCk7XG4gIC8vICAgICBhVGFyZ2V0W25JZHgrK10gPSAweERDMDAgLyogNTYzMjAgKi8gKyAobkNoYXIgJiAweDNGRiAvKiAxMDIzICovKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgcmV0dXJuIG5JZHg7XG4gIC8vIH1cbiAgLy9cbiAgLy8gcHJpdmF0ZSBzdGF0aWMgZ2V0VVRGMTZDaGFyTGVuZ3RoKG5DaGFyOiBudW1iZXIpOiBudW1iZXIge1xuICAvLyAgIHJldHVybiBuQ2hhciA8IDB4MTAwMDAgPyAxIDogMjtcbiAgLy8gfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RyO1xuICB9XG5cbiAgLy8gRGVwcmVjYXRlZFxuICBwdWJsaWMgY29kZVBvaW50QXQoaW5kZXg6IG51bWJlcik6QXJyYXlCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLmNvZGVVbml0QXQoaW5kZXgpO1xuICB9XG5cbiAgcHVibGljIGNvZGVVbml0QXQoaW5kZXg6IG51bWJlcik6QXJyYXlCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLnJhdy5zbGljZSh0aGlzLmluZGV4ZXNbaW5kZXhdLCB0aGlzLmluZGV4ZXNbaW5kZXgrMV0pO1xuICB9XG5cbn1cblxuXG4iLCJcbmltcG9ydCB7Q2xpZW50LCBXZWJTb2NrZXQsIE9wdGlvbn0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1iYXNlXCJcbmltcG9ydCB7RG9tV2ViU29ja2V0fSBmcm9tIFwiLi9zcmMvd2Vic29ja2V0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIE5ld0NsaWVudCh3c3M6IHN0cmluZywgLi4ub3BmOiBPcHRpb25bXSk6IENsaWVudCB7XG4gIG9wZi5wdXNoKFdlYlNvY2tldChEb21XZWJTb2NrZXQpKVxuICByZXR1cm4gbmV3IENsaWVudCh3c3MsIC4uLm9wZilcbn1cbiIsImltcG9ydCB7Q2xvc2VFdmVudCwgTWVzc2FnZUV2ZW50LCBFdmVudCwgV2ViU29ja2V0SW50ZXJmYWNlLCBFcnJvckV2ZW50fSBmcm9tIFwidHMtc3RyZWFtY2xpZW50LWJhc2VcIlxuXG5cbmV4cG9ydCBjbGFzcyBEb21XZWJTb2NrZXQgaW1wbGVtZW50cyBXZWJTb2NrZXRJbnRlcmZhY2V7XG5cbiAgb25jbG9zZTogKCh0aGlzOiBXZWJTb2NrZXRJbnRlcmZhY2UsIGV2OiBDbG9zZUV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9XG4gIG9uZXJyb3I6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXJyb3JFdmVudCkgPT4gYW55KSA9ICgpPT57fVxuICBvbm1lc3NhZ2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogTWVzc2FnZUV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9XG4gIG9ub3BlbjogKCh0aGlzOiBXZWJTb2NrZXRJbnRlcmZhY2UsIGV2OiBFdmVudCkgPT4gYW55KSA9ICgpPT57fVxuXG4gIHByaXZhdGUgd2Vic29ja2V0OiBXZWJTb2NrZXQ7XG5cbiAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLndlYnNvY2tldCA9IG5ldyBXZWJTb2NrZXQodXJsKVxuICAgIHRoaXMud2Vic29ja2V0LmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCJcbiAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKGV2OiBDbG9zZUV2ZW50KT0+e1xuICAgICAgY29uc29sZS53YXJuKFwiRG9tV2ViU29ja2V0LS0tb25jbG9zZVwiKVxuICAgICAgdGhpcy5vbmNsb3NlKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKGV2OiBFdmVudCk9PntcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJEb21XZWJTb2NrZXQtLS1vbmVycm9yXCIpXG4gICAgICB0aGlzLm9uZXJyb3Ioe2Vyck1zZzogXCJEb21XZWJTb2NrZXQ6IG9uZXJyb3IuIFwiICsgZXYudG9TdHJpbmcoKX0pXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50KT0+e1xuICAgICAgdGhpcy5vbm1lc3NhZ2UoZXYpXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9IChldjogRXZlbnQpPT57XG4gICAgICB0aGlzLm9ub3BlbihldilcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoY29kZT86IG51bWJlciwgcmVhc29uPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy53ZWJzb2NrZXQuY2xvc2UoY29kZSwgcmVhc29uKVxuICB9XG5cbiAgc2VuZChkYXRhOiBBcnJheUJ1ZmZlcik6IHZvaWQge1xuICAgIHRoaXMud2Vic29ja2V0LnNlbmQoZGF0YSlcbiAgfVxuXG59IiwiXG5leHBvcnQge3R5cGUgRHVyYXRpb24sIEhvdXIsIFNlY29uZCwgTWludXRlLCBNaWNyb3NlY29uZCwgTWlsbGlzZWNvbmR9IGZyb20gXCIuL3NyYy9kdXJhdGlvblwiXG5cblxuIiwiXG5cbmV4cG9ydCB0eXBlIER1cmF0aW9uID0gbnVtYmVyXG5cbmV4cG9ydCBjb25zdCBNaWNyb3NlY29uZCA9IDFcbmV4cG9ydCBjb25zdCBNaWxsaXNlY29uZCA9IDEwMDAgKiBNaWNyb3NlY29uZFxuZXhwb3J0IGNvbnN0IFNlY29uZCA9IDEwMDAgKiBNaWxsaXNlY29uZFxuZXhwb3J0IGNvbnN0IE1pbnV0ZSA9IDYwICogU2Vjb25kXG5leHBvcnQgY29uc3QgSG91ciA9IDYwICogTWludXRlIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcblxuLy8gY2xpZW50OiBDbGllbnRcbmltcG9ydCB7Q2xpZW50LCBDb25uRXJyb3J9IGZyb20gXCJ0cy1zdHJlYW1jbGllbnQtYmFzZVwiXG5pbXBvcnQge05ld0NsaWVudH0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1icm93c2VyXCJcblxuXG5sZXQgY2xpZW50OiBDbGllbnR8bnVsbCA9IG51bGxcbmxldCB1cmwgPSBcIlwiXG5cbmZ1bmN0aW9uIGhlYWRlcnMoY2FjaGU6IENhY2hlKTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gIGxldCByZXQ6TWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKVxuICBsZXQga2V5OiBzdHJpbmcgPSBcIlwiXG5cbiAga2V5ID0gKCQoXCIja2V5MVwiKS52YWwoKSBhcyBzdHJpbmcpLnRyaW0oKVxuICBpZiAoa2V5ICE9PSBcIlwiKSB7XG4gICAgY2FjaGUua2V5MSA9IGtleVxuICAgIGNhY2hlLnZhbHVlMSA9ICgkKFwiI3ZhbHVlMVwiKS52YWwoKSBhcyBzdHJpbmcpLnRyaW0oKVxuICAgIHJldC5zZXQoa2V5LCBjYWNoZS52YWx1ZTEpXG4gIH0gZWxzZSB7XG4gICAgY2FjaGUua2V5MSA9IFwiXCJcbiAgICBjYWNoZS52YWx1ZTEgPSBcIlwiXG4gIH1cblxuICBrZXkgPSAoJChcIiNrZXkyXCIpLnZhbCgpIGFzIHN0cmluZykudHJpbSgpXG4gIGlmIChrZXkgIT09IFwiXCIpIHtcbiAgICBjYWNoZS5rZXkyID0ga2V5XG4gICAgY2FjaGUudmFsdWUyID0gKCQoXCIjdmFsdWUyXCIpLnZhbCgpIGFzIHN0cmluZykudHJpbSgpXG4gICAgcmV0LnNldChrZXksIGNhY2hlLnZhbHVlMilcbiAgfSBlbHNlIHtcbiAgICBjYWNoZS5rZXkyID0gXCJcIlxuICAgIGNhY2hlLnZhbHVlMiA9IFwiXCJcbiAgfVxuXG4gIGtleSA9ICgkKFwiI2tleTNcIikudmFsKCkgYXMgc3RyaW5nKS50cmltKClcbiAgaWYgKGtleSAhPT0gXCJcIikge1xuICAgIGNhY2hlLmtleTMgPSBrZXlcbiAgICBjYWNoZS52YWx1ZTMgPSAoJChcIiN2YWx1ZTNcIikudmFsKCkgYXMgc3RyaW5nKS50cmltKClcbiAgICByZXQuc2V0KGtleSwgY2FjaGUudmFsdWUzKVxuICB9IGVsc2Uge1xuICAgIGNhY2hlLmtleTMgPSBcIlwiXG4gICAgY2FjaGUudmFsdWUzID0gXCJcIlxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBwcmludChzdHJpbmc6IHN0cmluZykge1xuICBsZXQgYm9keSA9ICQoJ2JvZHknKTtcbiAgYm9keS5hcHBlbmQoXCI8cD5cIitzdHJpbmcrXCI8L3A+XCIpO1xufVxuZnVuY3Rpb24gcHJpbnRQdXNoKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCBib2R5ID0gJCgnYm9keScpO1xuICBib2R5LmFwcGVuZChcIjxwIHN0eWxlPSdjb2xvcjogY2FkZXRibHVlJz5cIitzdHJpbmcrXCI8L3A+XCIpO1xufVxuZnVuY3Rpb24gcHJpbnRFcnJvcihzdHJpbmc6IHN0cmluZykge1xuICBsZXQgYm9keSA9ICQoJ2JvZHknKTtcbiAgYm9keS5hcHBlbmQoXCI8cCBzdHlsZT0nY29sb3I6IHJlZCc+XCIrc3RyaW5nK1wiPC9wPlwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmQoKSB7XG4gIGxldCB3c3MgPSAkKFwiI3dzc1wiKS52YWwoKVxuICBpZiAoY2xpZW50ID09PSBudWxsIHx8IHVybCAhPSB3c3MpIHtcbiAgICB1cmwgPSB3c3MgYXMgc3RyaW5nXG4gICAgY2xpZW50ID0gTmV3Q2xpZW50KHVybClcbiAgICBjbGllbnQuc2V0UHVzaENhbGxiYWNrKChkYXRhKT0+e1xuICAgICAgcHJpbnRQdXNoKFwicHVzaDogXCIgKyBkYXRhLnRvU3RyaW5nKCkpXG4gICAgfSlcbiAgICBjbGllbnQuc2V0UGVlckNsb3NlZENhbGxiYWNrKCgpPT57XG4gICAgICBwcmludEVycm9yKFwiY29ubjogY2xvc2VkIGJ5IHBlZXJcIilcbiAgICB9KVxuICB9XG5cbiAgbGV0IGNhY2hlID0gbmV3IENhY2hlKClcbiAgY2FjaGUud3NzID0gdXJsXG5cbiAgY2FjaGUuZGF0YSA9ICQoXCIjcG9zdFwiKS52YWwoKSBhcyBzdHJpbmdcblxuICBsZXQgW3JldCwgZXJyXSA9IGF3YWl0IGNsaWVudC5zZW5kKGNhY2hlLmRhdGEsIGhlYWRlcnMoY2FjaGUpKVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RcIiwgSlNPTi5zdHJpbmdpZnkoY2FjaGUpKVxuXG4gIGlmIChlcnIgIT09IG51bGwpIHtcbiAgICBpZiAoZXJyIGluc3RhbmNlb2YgQ29ubkVycm9yKSB7XG4gICAgICBjbGllbnQgPSBudWxsXG4gICAgICBwcmludEVycm9yKFwiY29ubi1lcnJvcjogXCIgKyBlcnIubWVzc2FnZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcHJpbnRFcnJvcihcInJlc3AtZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHByaW50KFwicmVzcDogXCIgKyByZXQudG9TdHJpbmcoKSArIFwiXFxuIC0tLT4ganNvbjogXCIgKyBKU09OLnN0cmluZ2lmeShKU09OLnBhcnNlKHJldC50b1N0cmluZygpKSkpXG4gICAgY29uc29sZS5sb2coXCJyZXNwLS0tanNvbjogXCIpXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXQudG9TdHJpbmcoKSkpXG4gIH1cbn1cblxuJChcIiNzZW5kXCIpLm9uKFwiY2xpY2tcIiwgYXN5bmMgKCk9PntcbiAgYXdhaXQgc2VuZCgpXG59KVxuXG5jbGFzcyBDYWNoZSB7XG4gIHdzczogc3RyaW5nID0gXCJcIlxuICBrZXkxOiBzdHJpbmcgPSBcIlwiXG4gIHZhbHVlMTogc3RyaW5nID0gXCJcIlxuICBrZXkyOiBzdHJpbmcgPSBcIlwiXG4gIHZhbHVlMjogc3RyaW5nID0gXCJcIlxuICBrZXkzOiBzdHJpbmcgPSBcIlwiXG4gIHZhbHVlMzogc3RyaW5nID0gXCJcIlxuICBkYXRhOiBzdHJpbmcgPSBcIlwiXG59XG5cbiQoKCk9PntcbiAgbGV0IGNhY2hlUyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFzdFwiKVxuICBsZXQgY2FjaGU6IENhY2hlXG4gIGlmIChjYWNoZVMgPT09IG51bGwpIHtcbiAgICBjYWNoZSA9IG5ldyBDYWNoZSgpXG4gIH0gZWxzZSB7XG4gICAgY2FjaGUgPSBKU09OLnBhcnNlKGNhY2hlUykgYXMgQ2FjaGVcbiAgfVxuXG4gICQoXCIja2V5MVwiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUua2V5MSlcbiAgJChcIiN2YWx1ZTFcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLnZhbHVlMSlcbiAgJChcIiNrZXkyXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS5rZXkyKVxuICAkKFwiI3ZhbHVlMlwiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUudmFsdWUyKVxuICAkKFwiI2tleTNcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLmtleTMpXG4gICQoXCIjdmFsdWUzXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS52YWx1ZTMpXG4gICQoXCIjd3NzXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS53c3MpXG4gICQoXCIjcG9zdFwiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUuZGF0YSlcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=