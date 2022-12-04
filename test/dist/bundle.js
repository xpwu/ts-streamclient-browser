/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../index.ts":
/*!*******************!*\
  !*** ../index.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewClient": () => (/* binding */ NewClient)
/* harmony export */ });
/* harmony import */ var ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-streamclient-base */ "../node_modules/ts-streamclient-base/index.ts");
/* harmony import */ var _src_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/websocket */ "../src/websocket.ts");


function NewClient(wss, ...opf) {
    opf.push((0,ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__.WebSocket)(_src_websocket__WEBPACK_IMPORTED_MODULE_1__.DomWebSocket));
    return new ts_streamclient_base__WEBPACK_IMPORTED_MODULE_0__.Client(wss, ...opf);
}


/***/ }),

/***/ "../node_modules/ts-streamclient-base/index.ts":
/*!*****************************************************!*\
  !*** ../node_modules/ts-streamclient-base/index.ts ***!
  \*****************************************************/
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
/* harmony import */ var _src_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/client */ "../node_modules/ts-streamclient-base/src/client.ts");
/* harmony import */ var _src_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utf8 */ "../node_modules/ts-streamclient-base/src/utf8.ts");
/* harmony import */ var _src_connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/connection */ "../node_modules/ts-streamclient-base/src/connection.ts");
/* harmony import */ var _src_option__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/option */ "../node_modules/ts-streamclient-base/src/option.ts");
/* harmony import */ var _src_connerror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/connerror */ "../node_modules/ts-streamclient-base/src/connerror.ts");







/***/ }),

/***/ "../node_modules/ts-streamclient-base/src/client.ts":
/*!**********************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/client.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* binding */ Client),
/* harmony export */   "Result": () => (/* binding */ Result)
/* harmony export */ });
/* harmony import */ var _fakehttp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fakehttp */ "../node_modules/ts-streamclient-base/src/fakehttp.ts");
/* harmony import */ var _net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./net */ "../node_modules/ts-streamclient-base/src/net.ts");
/* harmony import */ var _option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./option */ "../node_modules/ts-streamclient-base/src/option.ts");
/* harmony import */ var ts_xutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ts-xutils */ "../node_modules/ts-xutils/index.ts");
/* harmony import */ var _connerror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./connerror */ "../node_modules/ts-streamclient-base/src/connerror.ts");
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utf8 */ "../node_modules/ts-streamclient-base/src/utf8.ts");
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
        return this.utf8.toString();
    }
    rawBuffer() {
        return this.utf8.raw;
    }
    constructor(utf8) {
        this.utf8 = utf8;
    }
}
let emptyResult = new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(""));
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
                        this.onPush(new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data())));
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
                    clearTimeout(timer);
                    if (result.err !== null) {
                        resolve([emptyResult, result.err]);
                        return;
                    }
                    let res = result.res;
                    if (res.status !== _fakehttp__WEBPACK_IMPORTED_MODULE_0__.Status.Ok) {
                        resolve([emptyResult, new Error(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data()).toString())]);
                        return;
                    }
                    resolve([new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data())), null]);
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
                clearTimeout(timer);
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

/***/ "../node_modules/ts-streamclient-base/src/connection.ts":
/*!**************************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/connection.ts ***!
  \**************************************************************/
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

/***/ "../node_modules/ts-streamclient-base/src/connerror.ts":
/*!*************************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/connerror.ts ***!
  \*************************************************************/
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

/***/ "../node_modules/ts-streamclient-base/src/fakehttp.ts":
/*!************************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/fakehttp.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Request": () => (/* binding */ Request),
/* harmony export */   "Response": () => (/* binding */ Response),
/* harmony export */   "Status": () => (/* binding */ Status)
/* harmony export */ });
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utf8 */ "../node_modules/ts-streamclient-base/src/utf8.ts");
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

/***/ "../node_modules/ts-streamclient-base/src/net.ts":
/*!*******************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/net.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Net": () => (/* binding */ Net)
/* harmony export */ });
/* harmony import */ var ts_xutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-xutils */ "../node_modules/ts-xutils/index.ts");
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection */ "../node_modules/ts-streamclient-base/src/connection.ts");
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

/***/ "../node_modules/ts-streamclient-base/src/option.ts":
/*!**********************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/option.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectTimeout": () => (/* binding */ ConnectTimeout),
/* harmony export */   "RequestTimeout": () => (/* binding */ RequestTimeout),
/* harmony export */   "WebSocket": () => (/* binding */ WebSocket),
/* harmony export */   "option": () => (/* binding */ option)
/* harmony export */ });
/* harmony import */ var ts_xutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-xutils */ "../node_modules/ts-xutils/index.ts");
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection */ "../node_modules/ts-streamclient-base/src/connection.ts");


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

/***/ "../node_modules/ts-streamclient-base/src/utf8.ts":
/*!********************************************************!*\
  !*** ../node_modules/ts-streamclient-base/src/utf8.ts ***!
  \********************************************************/
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
            let utf8i = 0;
            while (utf8i < this.raw.length) {
                this.indexes.push(utf8i);
                utf8i += Utf8.getUTF8CharLength(Utf8.loadUTF8CharCode(this.raw, utf8i));
            }
            this.indexes.push(utf8i); // end flag
            this.str = null;
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
        if (this.str != null) {
            return this.str;
        }
        let codes = new Array();
        for (let utf8i = 0; utf8i < this.raw.length;) {
            let code = Utf8.loadUTF8CharCode(this.raw, utf8i);
            codes.push(code);
            utf8i += Utf8.getUTF8CharLength(code);
        }
        this.str = String.fromCodePoint(...codes);
        return this.str;
    }
    codePointAt(index) {
        return this.raw.slice(this.indexes[index], this.indexes[index + 1]);
    }
}


/***/ }),

/***/ "../node_modules/ts-xutils/index.ts":
/*!******************************************!*\
  !*** ../node_modules/ts-xutils/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hour": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Hour),
/* harmony export */   "Microsecond": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Microsecond),
/* harmony export */   "Millisecond": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Millisecond),
/* harmony export */   "Minute": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Minute),
/* harmony export */   "Second": () => (/* reexport safe */ _src_duration__WEBPACK_IMPORTED_MODULE_0__.Second)
/* harmony export */ });
/* harmony import */ var _src_duration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/duration */ "../node_modules/ts-xutils/src/duration.ts");



/***/ }),

/***/ "../node_modules/ts-xutils/src/duration.ts":
/*!*************************************************!*\
  !*** ../node_modules/ts-xutils/src/duration.ts ***!
  \*************************************************/
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


/***/ }),

/***/ "../src/websocket.ts":
/*!***************************!*\
  !*** ../src/websocket.ts ***!
  \***************************/
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
        return this.utf8.toString();
    }
    rawBuffer() {
        return this.utf8.raw;
    }
    constructor(utf8) {
        this.utf8 = utf8;
    }
}
let emptyResult = new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(""));
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
                        this.onPush(new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data())));
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
                    clearTimeout(timer);
                    if (result.err !== null) {
                        resolve([emptyResult, result.err]);
                        return;
                    }
                    let res = result.res;
                    if (res.status !== _fakehttp__WEBPACK_IMPORTED_MODULE_0__.Status.Ok) {
                        resolve([emptyResult, new Error(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data()).toString())]);
                        return;
                    }
                    resolve([new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data())), null]);
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
                clearTimeout(timer);
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
            let utf8i = 0;
            while (utf8i < this.raw.length) {
                this.indexes.push(utf8i);
                utf8i += Utf8.getUTF8CharLength(Utf8.loadUTF8CharCode(this.raw, utf8i));
            }
            this.indexes.push(utf8i); // end flag
            this.str = null;
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
        if (this.str != null) {
            return this.str;
        }
        let codes = new Array();
        for (let utf8i = 0; utf8i < this.raw.length;) {
            let code = Utf8.loadUTF8CharCode(this.raw, utf8i);
            codes.push(code);
            utf8i += Utf8.getUTF8CharLength(code);
        }
        this.str = String.fromCodePoint(...codes);
        return this.str;
    }
    codePointAt(index) {
        return this.raw.slice(this.indexes[index], this.indexes[index + 1]);
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
/* harmony import */ var src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src */ "../index.ts");
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
            client = (0,src__WEBPACK_IMPORTED_MODULE_1__.NewClient)(url);
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
            print("resp: " + ret.toString() + "\n ---> json: see the 'console'");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSx1Q0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFCLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUUzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEtBQUssSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3ZCLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVELEdBQUcsRUFBRSxDQUFDO1lBQ04sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEQsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ3hCLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELEdBQUcsRUFBRSxDQUFDO1lBQ04sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLEdBQUcsRUFBRSxDQUFDO1FBRU4sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sUUFBUSxDQUFDLEVBQVM7UUFDdkIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTTtJQUNwQixDQUFDO0NBRUY7QUFFRCxJQUFZLE1BR1g7QUFIRCxXQUFZLE1BQU07SUFDaEIsK0JBQUU7SUFDRix1Q0FBTTtBQUNSLENBQUMsRUFIVyxNQUFNLEtBQU4sTUFBTSxRQUdqQjtBQUVNLE1BQU0sUUFBUTtJQUtuQixZQUFZLE1BQW1CO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzlELENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLElBQUk7UUFFVCxJQUFJLE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsU0FBUztZQUNULE1BQU0sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sRUFBRTtZQUNwQyxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtRQUN2QyxrREFBa0Q7UUFDbEQsMEJBQTBCO0lBQzVCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNyRCxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUVELElBQUksR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxPQUFPLEdBQUc7SUFDWixDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFZLEVBQUUsR0FBVTtRQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLHVDQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhCLE9BQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xKOEM7QUFDb0Q7QUFXNUYsTUFBTSxHQUFHO0lBTWQsWUFBb0IsR0FBVyxFQUFVLGNBQXdCLEVBQzNDLG9CQUEwQyxFQUMxQyxNQUFpQjtRQUZuQixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQVU7UUFDM0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBTi9CLFNBQUksR0FBc0IsSUFBSSxDQUFDO1FBQy9CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWMsR0FBdUMsSUFBSSxLQUFLLEVBQStCLENBQUM7SUFLdEcsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEdBQWlCO1FBQ3hDLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUErQixDQUFDO0lBQ2pFLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLElBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sU0FBUyxDQUFDLEdBQVc7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQ2hCLENBQUM7SUFFRCwrRUFBK0U7SUFDL0UsMkVBQTJFO0lBQzNFLGdDQUFnQztJQUNoQywwRUFBMEU7SUFDN0QsT0FBTzs7WUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixPQUFPLElBQUk7YUFDWjtZQUVELE9BQU8sSUFBSSxPQUFPLENBQWUsQ0FBQyxPQUFvQyxFQUFFLEVBQUU7Z0JBQ3hFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO29CQUNyQixPQUFNO2lCQUNQO2dCQUVELElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFFLEVBQUU7b0JBQ3pCLHlCQUF5QjtvQkFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFFdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3JELENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFDLGtEQUFXLENBQUM7Z0JBRW5DLElBQUk7b0JBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLG1EQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDakU7Z0JBQUEsT0FBTyxDQUFDLEVBQUU7b0JBQ1Qsd0VBQXdFO29CQUN4RSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN2QixZQUFZLENBQUMsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBVyxDQUFDLENBQUM7b0JBQzdDLE9BQU07aUJBQ1A7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFvQixFQUFDLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixZQUFZLENBQUMsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQWtCLEVBQUUsRUFBRTs7b0JBQ3pDLG9DQUFvQztvQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ25CLE9BQU07cUJBQ1A7b0JBRUQsSUFBSSxVQUFVLEdBQUcsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBQztvQkFDMUQsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTt3QkFDN0YsVUFBVSxDQUFDLE1BQU0sR0FBRyxTQUFTO3FCQUM5QjtvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2hDLFVBQUksQ0FBQyxJQUFJLDBDQUFFLEtBQUssRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQztnQkFFRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQWtCLEVBQUUsRUFBRTs7b0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN2QywyREFBMkQ7b0JBQzNELHdFQUF3RTtvQkFFeEUsc0NBQXNDO29CQUN0QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO3dCQUN0QixPQUFNO3FCQUNQO29CQUVELDBCQUEwQjtvQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRSxFQUFFLEdBQUMsQ0FBQztvQkFFMUIsNkNBQTZDO29CQUM3QyxrREFBa0Q7b0JBQ2xELCtCQUErQjtvQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ25CLFlBQVksQ0FBQyxLQUFLLENBQUM7d0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDakQ7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQzt3QkFDckUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTs0QkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDdkI7cUJBQ0Y7b0JBRUQsVUFBSSxDQUFDLElBQUksMENBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQyxDQUFDO1lBRUosQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFTSxLQUFLLENBQUMsSUFBaUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRU0sVUFBVSxDQUFDLElBQWlCOztRQUNqQyxVQUFJLENBQUMsSUFBSSwwQ0FBRSxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFTSxtQkFBbUI7O1FBQ3hCLFVBQUksQ0FBQyxJQUFJLDBDQUFFLG1CQUFtQixFQUFFO0lBQ2xDLENBQUM7Q0FFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SnlDO0FBQ2dCO0FBRW5ELE1BQU0sTUFBTTtJQUFuQjtRQUNFLG1CQUFjLEdBQWEsRUFBRSxHQUFDLDZDQUFNO1FBQ3BDLG1CQUFjLEdBQWEsRUFBRSxHQUFDLDZDQUFNO1FBQ3BDLHlCQUFvQixHQUF5QixnREFBTztJQUN0RCxDQUFDO0NBQUE7QUFJTSxTQUFTLGNBQWMsQ0FBQyxDQUFZO0lBQ3pDLE9BQU8sQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUNwQixFQUFFLENBQUMsY0FBYyxHQUFHLENBQUM7SUFDdkIsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLGNBQWMsQ0FBQyxDQUFXO0lBQ3hDLE9BQU8sQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUNwQixFQUFFLENBQUMsY0FBYyxHQUFHLENBQUM7SUFDdkIsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLFNBQVMsQ0FBQyxvQkFBMEM7SUFDbEUsT0FBTyxDQUFDLEVBQVUsRUFBRSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0I7SUFDaEQsQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFCTSxNQUFNLElBQUk7SUFPZixZQUFZLEtBQXlCO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUVuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxXQUFXO1lBRXRDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBRWpCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztZQUVqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtnQkFDcEIsTUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBRSxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVsQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUUsRUFBRSxLQUFLLENBQUM7YUFDbEU7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVc7U0FDdEM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBRXhDLENBQUM7SUFFTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBa0IsRUFBRSxJQUFZO1FBRTlELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxPQUFPLEtBQUssR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3BELCtEQUErRDtZQUMvRCxlQUFlLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO2tCQUN6RSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO2tCQUMvRCxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUN4RCxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLGdCQUFnQixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztzQkFDbkUsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztzQkFDOUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO2dCQUN4QixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQy9DLGdCQUFnQixFQUFDLEtBQUssR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7MEJBQ2xFLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO29CQUN4RCxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQy9DLGlCQUFpQixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQzs4QkFDbkUsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFD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LEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVELEdBQUcsRUFBRSxDQUFDO1lBQ04sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEQsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ3hCLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELEdBQUcsRUFBRSxDQUFDO1lBQ04sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLEdBQUcsRUFBRSxDQUFDO1FBRU4sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sUUFBUSxDQUFDLEVBQVM7UUFDdkIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTTtJQUNwQixDQUFDO0NBRUY7QUFFRCxJQUFZLE1BR1g7QUFIRCxXQUFZLE1BQU07SUFDaEIsK0JBQUU7SUFDRix1Q0FBTTtBQUNSLENBQUMsRUFIVyxNQUFNLEtBQU4sTUFBTSxRQUdqQjtBQUVNLE1BQU0sUUFBUTtJQUtuQixZQUFZLE1BQW1CO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzlELENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLElBQUk7UUFFVCxJQUFJLE1BQU0sR0FBRyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsU0FBUztZQUNULE1BQU0sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sRUFBRTtZQUNwQyxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtRQUN2QyxrREFBa0Q7UUFDbEQsMEJBQTBCO0lBQzVCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRTtZQUNyRCxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUVELElBQUksR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxPQUFPLEdBQUc7SUFDWixDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFZLEVBQUUsR0FBVTtRQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLHVDQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhCLE9BQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xKOEM7QUFDb0Q7QUFXNUYsTUFBTSxHQUFHO0lBTWQsWUFBb0IsR0FBVyxFQUFVLGNBQXdCLEVBQzNDLG9CQUEwQyxFQUMxQyxNQUFpQjtRQUZuQixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQVU7UUFDM0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBTi9CLFNBQUksR0FBc0IsSUFBSSxDQUFDO1FBQy9CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWMsR0FBdUMsSUFBSSxLQUFLLEVBQStCLENBQUM7SUFLdEcsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEdBQWlCO1FBQ3hDLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUErQixDQUFDO0lBQ2pFLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLElBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sU0FBUyxDQUFDLEdBQVc7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQ2hCLENBQUM7SUFFRCwrRUFBK0U7SUFDL0UsMkVBQTJFO0lBQzNFLGdDQUFnQztJQUNoQywwRUFBMEU7SUFDN0QsT0FBTzs7WUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixPQUFPLElBQUk7YUFDWjtZQUVELE9BQU8sSUFBSSxPQUFPLENBQWUsQ0FBQyxPQUFvQyxFQUFFLEVBQUU7Z0JBQ3hFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO29CQUNyQixPQUFNO2lCQUNQO2dCQUVELElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFFLEVBQUU7b0JBQ3pCLHlCQUF5QjtvQkFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFFdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3JELENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFDLGtEQUFXLENBQUM7Z0JBRW5DLElBQUk7b0JBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLG1EQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDakU7Z0JBQUEsT0FBTyxDQUFDLEVBQUU7b0JBQ1Qsd0VBQXdFO29CQUN4RSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN2QixZQUFZLENBQUMsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBVyxDQUFDLENBQUM7b0JBQzdDLE9BQU07aUJBQ1A7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFvQixFQUFDLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixZQUFZLENBQUMsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQWtCLEVBQUUsRUFBRTs7b0JBQ3pDLG9DQUFvQztvQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ25CLE9BQU07cUJBQ1A7b0JBRUQsSUFBSSxVQUFVLEdBQUcsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBQztvQkFDMUQsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTt3QkFDN0YsVUFBVSxDQUFDLE1BQU0sR0FBRyxTQUFTO3FCQUM5QjtvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2hDLFVBQUksQ0FBQyxJQUFJLDBDQUFFLEtBQUssRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQztnQkFFRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQWtCLEVBQUUsRUFBRTs7b0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN2QywyREFBMkQ7b0JBQzNELHdFQUF3RTtvQkFFeEUsc0NBQXNDO29CQUN0QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO3dCQUN0QixPQUFNO3FCQUNQO29CQUVELDBCQUEwQjtvQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRSxFQUFFLEdBQUMsQ0FBQztvQkFFMUIsNkNBQTZDO29CQUM3QyxrREFBa0Q7b0JBQ2xELCtCQUErQjtvQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ25CLFlBQVksQ0FBQyxLQUFLLENBQUM7d0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDakQ7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQzt3QkFDckUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTs0QkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDdkI7cUJBQ0Y7b0JBRUQsVUFBSSxDQUFDLElBQUksMENBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQyxDQUFDO1lBRUosQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFTSxLQUFLLENBQUMsSUFBaUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRU0sVUFBVSxDQUFDLElBQWlCOztRQUNqQyxVQUFJLENBQUMsSUFBSSwwQ0FBRSxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFTSxtQkFBbUI7O1FBQ3hCLFVBQUksQ0FBQyxJQUFJLDBDQUFFLG1CQUFtQixFQUFFO0lBQ2xDLENBQUM7Q0FFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SnlDO0FBQ2dCO0FBRW5ELE1BQU0sTUFBTTtJQUFuQjtRQUNFLG1CQUFjLEdBQWEsRUFBRSxHQUFDLDZDQUFNO1FBQ3BDLG1CQUFjLEdBQWEsRUFBRSxHQUFDLDZDQUFNO1FBQ3BDLHlCQUFvQixHQUF5QixnREFBTztJQUN0RCxDQUFDO0NBQUE7QUFJTSxTQUFTLGNBQWMsQ0FBQyxDQUFZO0lBQ3pDLE9BQU8sQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUNwQixFQUFFLENBQUMsY0FBYyxHQUFHLENBQUM7SUFDdkIsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLGNBQWMsQ0FBQyxDQUFXO0lBQ3hDLE9BQU8sQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUNwQixFQUFFLENBQUMsY0FBYyxHQUFHLENBQUM7SUFDdkIsQ0FBQztBQUNILENBQUM7QUFFTSxTQUFTLFNBQVMsQ0FBQyxvQkFBMEM7SUFDbEUsT0FBTyxDQUFDLEVBQVUsRUFBRSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0I7SUFDaEQsQ0FBQztBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFCTSxNQUFNLElBQUk7SUFPZixZQUFZLEtBQXlCO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUVuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxXQUFXO1lBRXRDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBRWpCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztZQUVqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtnQkFDcEIsTUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBRSxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVsQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUUsRUFBRSxLQUFLLENBQUM7YUFDbEU7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVc7U0FDdEM7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBRXhDLENBQUM7SUFFTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBa0IsRUFBRSxJQUFZO1FBRTlELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxPQUFPLEtBQUssR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3BELCtEQUErRDtZQUMvRCxlQUFlLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO2tCQUN6RSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO2tCQUMvRCxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUN4RCxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLGdCQUFnQixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztzQkFDbkUsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztzQkFDOUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO2dCQUN4QixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQy9DLGdCQUFnQixFQUFDLEtBQUssR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7MEJBQ2xFLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO29CQUN4RCxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQy9DLGlCQUFpQixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQzs4QkFDbkUsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO3dCQUN4QixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7NEJBQy9DLGVBQWUsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHOzRCQUMzRCxDQUFDO2dDQUNELGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBbUIsRUFBRSxLQUFhLEVBQ2hDLE1BQWM7UUFFN0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBRWxCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDMUIsY0FBYztZQUNkLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN6QjthQUFNLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDbkMsZUFBZTtZQUNmLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3RDLGlCQUFpQjtZQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3pDLGdCQUFnQjtZQUNoQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1RDthQUFNLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUU7WUFDM0MsZ0JBQWdCO1lBQ2hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUQ7YUFBTSw4QkFBOEIsQ0FBQyxFQUFFLGdCQUFnQjtZQUN0RCxlQUFlO1lBQ2YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRywwREFBMEQsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQztZQUNuSCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFZCxDQUFDO0lBQUEsQ0FBQztJQUVNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFhO1FBQzVDLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxPQUFPO1lBQzNELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUdELGdGQUFnRjtJQUNoRixFQUFFO0lBQ0YsaURBQWlEO0lBQ2pELGlDQUFpQztJQUNqQyxFQUFFO0lBQ0YsdUVBQXVFO0lBQ3ZFLG1GQUFtRjtJQUNuRixrQkFBa0I7SUFDbEIsSUFBSTtJQUNKLEVBQUU7SUFDRixnR0FBZ0c7SUFDaEcsRUFBRTtJQUNGLHVCQUF1QjtJQUN2QixFQUFFO0lBQ0YsdUNBQXVDO0lBQ3ZDLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0IsYUFBYTtJQUNiLHlCQUF5QjtJQUN6Qiw2REFBNkQ7SUFDN0QseUVBQXlFO0lBQ3pFLE1BQU07SUFDTixFQUFFO0lBQ0YsaUJBQWlCO0lBQ2pCLElBQUk7SUFDSixFQUFFO0lBQ0YsNkRBQTZEO0lBQzdELG9DQUFvQztJQUNwQyxJQUFJO0lBRUcsUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRztTQUNoQjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDaEMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHO1lBQzVDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakIsS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBRTFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWE7UUFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pLc0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHaEYsTUFBTSxXQUFXLEdBQUcsQ0FBQztBQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsV0FBVztBQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsV0FBVztBQUNqQyxNQUFNLE1BQU0sR0FBRyxFQUFFLEdBQUcsTUFBTTtBQUMxQixNQUFNLElBQUksR0FBRyxFQUFFLEdBQUcsTUFBTTs7Ozs7OztVQ1IvQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBLGlCQUFpQjtBQUNxQztBQUN6QjtBQUc3QixJQUFJLE1BQU0sR0FBZ0IsSUFBSTtBQUM5QixJQUFJLEdBQUcsR0FBRyxFQUFFO0FBRVosU0FBUyxPQUFPLENBQUMsS0FBWTtJQUMzQixJQUFJLEdBQUcsR0FBdUIsSUFBSSxHQUFHLEVBQUU7SUFDdkMsSUFBSSxHQUFHLEdBQVcsRUFBRTtJQUVwQixHQUFHLEdBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBYSxDQUFDLElBQUksRUFBRTtJQUN6QyxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7UUFDZCxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUc7UUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7S0FDM0I7U0FBTTtRQUNMLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUNmLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRTtLQUNsQjtJQUVELEdBQUcsR0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFhLENBQUMsSUFBSSxFQUFFO0lBQ3pDLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtRQUNkLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUMzQjtTQUFNO1FBQ0wsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ2YsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFO0tBQ2xCO0lBRUQsR0FBRyxHQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQWEsQ0FBQyxJQUFJLEVBQUU7SUFDekMsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1FBQ2QsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLEdBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBYSxDQUFDLElBQUksRUFBRTtRQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO0tBQzNCO1NBQU07UUFDTCxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDZixLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUU7S0FDbEI7SUFFRCxPQUFPLEdBQUc7QUFDWixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsTUFBYztJQUMzQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBQyxNQUFjO0lBQy9CLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLDhCQUE4QixHQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsTUFBYztJQUNoQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsR0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVNLFNBQWUsSUFBSTs7UUFDeEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRTtRQUN6QixJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNqQyxHQUFHLEdBQUcsR0FBYTtZQUNuQixNQUFNLEdBQUcsOENBQVMsQ0FBQyxHQUFHLENBQUM7WUFDdkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBQyxFQUFFO2dCQUM3QixTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QyxDQUFDLENBQUM7WUFDRixNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRSxFQUFFO2dCQUMvQixVQUFVLENBQUMsc0JBQXNCLENBQUM7WUFDcEMsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtRQUN2QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUc7UUFFZixLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQVk7UUFFdkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxHQUFHLFlBQVksMkRBQVMsRUFBRTtnQkFDNUIsTUFBTSxHQUFHLElBQUk7Z0JBQ2IsVUFBVSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQ3pDO2lCQUFNO2dCQUNMLFVBQVUsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzthQUN6QztTQUNGO2FBQU07WUFDTCxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxpQ0FBaUMsQ0FBQztZQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0NBQUE7QUFFRCxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFRLEVBQUU7SUFDL0IsTUFBTSxJQUFJLEVBQUU7QUFDZCxDQUFDLEVBQUM7QUFFRixNQUFNLEtBQUs7SUFBWDtRQUNFLFFBQUcsR0FBVyxFQUFFO1FBQ2hCLFNBQUksR0FBVyxFQUFFO1FBQ2pCLFdBQU0sR0FBVyxFQUFFO1FBQ25CLFNBQUksR0FBVyxFQUFFO1FBQ2pCLFdBQU0sR0FBVyxFQUFFO1FBQ25CLFNBQUksR0FBVyxFQUFFO1FBQ2pCLFdBQU0sR0FBVyxFQUFFO1FBQ25CLFNBQUksR0FBVyxFQUFFO0lBQ25CLENBQUM7Q0FBQTtBQUVELENBQUMsQ0FBQyxHQUFFLEVBQUU7SUFDSixJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUN6QyxJQUFJLEtBQVk7SUFDaEIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ25CLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRTtLQUNwQjtTQUFNO1FBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFVO0tBQ3BDO0lBRUQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3RDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY29ubmVjdGlvbi50cyIsIndlYnBhY2s6Ly90ZXN0Ly4uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY29ubmVycm9yLnRzIiwid2VicGFjazovL3Rlc3QvLi4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1iYXNlL3NyYy9mYWtlaHR0cC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvbmV0LnRzIiwid2VicGFjazovL3Rlc3QvLi4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1iYXNlL3NyYy9vcHRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL3V0ZjgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9ub2RlX21vZHVsZXMvdHMteHV0aWxzL2luZGV4LnRzIiwid2VicGFjazovL3Rlc3QvLi4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9zcmMvZHVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uLi9zcmMvd2Vic29ja2V0LnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY29ubmVycm9yLnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2Zha2VodHRwLnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL25ldC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1iYXNlL3NyYy9vcHRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvdXRmOC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9zcmMvZHVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7Q2xpZW50LCBXZWJTb2NrZXQsIE9wdGlvbn0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1iYXNlXCJcbmltcG9ydCB7RG9tV2ViU29ja2V0fSBmcm9tIFwiLi9zcmMvd2Vic29ja2V0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIE5ld0NsaWVudCh3c3M6IHN0cmluZywgLi4ub3BmOiBPcHRpb25bXSk6IENsaWVudCB7XG4gIG9wZi5wdXNoKFdlYlNvY2tldChEb21XZWJTb2NrZXQpKVxuICByZXR1cm4gbmV3IENsaWVudCh3c3MsIC4uLm9wZilcbn1cbiIsIlxuZXhwb3J0IHtDbGllbnQsIFJlc3VsdH0gZnJvbSBcIi4vc3JjL2NsaWVudFwiXG5cbmV4cG9ydCB7VXRmOH0gZnJvbSBcIi4vc3JjL3V0ZjhcIlxuXG5leHBvcnQge0V2ZW50LCBFcnJvckV2ZW50LCBXZWJTb2NrZXRDb25zdHJ1Y3RvciwgV2ViU29ja2V0SW50ZXJmYWNlLCBDbG9zZUV2ZW50LCBDb25uZWN0aW9uLCBNZXNzYWdlRXZlbnR9IGZyb20gXCIuL3NyYy9jb25uZWN0aW9uXCJcblxuZXhwb3J0IHtPcHRpb24sIFJlcXVlc3RUaW1lb3V0LCBDb25uZWN0VGltZW91dCwgV2ViU29ja2V0fSBmcm9tIFwiLi9zcmMvb3B0aW9uXCJcblxuZXhwb3J0IHtDb25uRXJyb3J9IGZyb20gXCIuL3NyYy9jb25uZXJyb3JcIlxuIiwiXG5pbXBvcnQge1JlcXVlc3QsIFJlc3BvbnNlLCBTdGF0dXN9IGZyb20gXCIuL2Zha2VodHRwXCI7XG5pbXBvcnQge05ldH0gZnJvbSBcIi4vbmV0XCJcbmltcG9ydCB7b3B0aW9uLCBPcHRpb259IGZyb20gXCIuL29wdGlvblwiXG5pbXBvcnQge01pbGxpc2Vjb25kfSBmcm9tIFwidHMteHV0aWxzXCJcbmltcG9ydCB7Q2xvc2VFdmVudH0gZnJvbSBcIi4vY29ubmVjdGlvblwiXG5pbXBvcnQge0Nvbm5FcnJvcn0gZnJvbSBcIi4vY29ubmVycm9yXCJcbmltcG9ydCB7VXRmOH0gZnJvbSBcIi4vdXRmOFwiXG5cbmV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICBwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnV0ZjgudG9TdHJpbmcoKVxuICB9XG5cbiAgcHVibGljIHJhd0J1ZmZlcigpOlVpbnQ4QXJyYXkge1xuICAgIHJldHVybiB0aGlzLnV0ZjgucmF3XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0Zjg6VXRmOCkge1xuICB9XG59XG5cbmxldCBlbXB0eVJlc3VsdCA9IG5ldyBSZXN1bHQobmV3IFV0ZjgoXCJcIikpXG5cbmV4cG9ydCBjbGFzcyBDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IG5ldDogTmV0O1xuICBwcml2YXRlIGFsbFJlcTogTWFwPG51bWJlciwgKHJlc3VsdDoge3JlczogUmVzcG9uc2UsIGVycjogbnVsbH18e3JlczogbnVsbCwgZXJyOiBFcnJvcn0pID0+IHZvaWQ+O1xuICBwcml2YXRlIHJlcUlkOiBudW1iZXI7XG4gIC8vIHByaXZhdGUgb25QdXNoOiAocmVzOnN0cmluZyk9PlByb21pc2U8dm9pZD4gPSAocmVzOnN0cmluZyk9PntyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCl9O1xuICAvLyBwcml2YXRlIG9uUGVlckNsb3NlZDogKCk9PlByb21pc2U8dm9pZD4gPSAoKT0+e3JldHVybiBQcm9taXNlLnJlc29sdmUoKX07XG4gIHByaXZhdGUgb25QdXNoOiAocmVzOlJlc3VsdCk9PnZvaWQgPSAoKT0+e307XG4gIHByaXZhdGUgb25QZWVyQ2xvc2VkOiAoKT0+dm9pZCA9ICgpPT57fTtcbiAgcHJpdmF0ZSBvcCA9IG5ldyBvcHRpb25cblxuICAvLyB3cyBvciB3c3Mg5Y2P6K6u44CCXG4gIGNvbnN0cnVjdG9yKHdzczogc3RyaW5nLCAuLi5vcGY6IE9wdGlvbltdKSB7XG4gICAgaWYgKHdzcy5pbmRleE9mKFwiczovL1wiKSA9PT0gLTEpIHtcbiAgICAgIHdzcyA9IFwid3M6Ly9cIiArIHdzcztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBvIG9mIG9wZikge1xuICAgICAgbyh0aGlzLm9wKVxuICAgIH1cblxuICAgIHRoaXMubmV0ID0gbmV3IE5ldCh3c3MsIHRoaXMub3AuY29ubmVjdFRpbWVvdXQsIHRoaXMub3Aud2ViU29ja2V0Q29uc3RydWN0b3IsIHtcbiAgICAgIG9uTWVzc2FnZTogKHZhbHVlOiBBcnJheUJ1ZmZlcik6IHZvaWQgPT4ge1xuICAgICAgICBsZXQgcmVzID0gbmV3IFJlc3BvbnNlKHZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5pc1B1c2goKSkge1xuICAgICAgICAgIC8vIHB1c2ggYWNrIOW8uuWItuWGmee7mee9kee7nO+8jOS4jeiuoeWFpeW5tuWPkeaOp+WItlxuICAgICAgICAgIHRoaXMubmV0LldyaXRlRm9yY2UocmVzLm5ld1B1c2hBY2soKSlcbiAgICAgICAgICAvLyDlvILmraXmiafooYxcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLm9uUHVzaChuZXcgUmVzdWx0KG5ldyBVdGY4KHJlcy5kYXRhKCkpKSlcbiAgICAgICAgICB9LCAwKVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsYiA9IHRoaXMuYWxsUmVxLmdldChyZXMucmVxSUQoKSkgfHwgKCgpID0+IHt9KTtcbiAgICAgICAgdGhpcy5uZXQucmVjZWl2ZWRPbmVSZXNwb25zZSgpXG4gICAgICAgIGNsYih7cmVzOnJlcywgZXJyOm51bGx9KTtcbiAgICAgICAgdGhpcy5hbGxSZXEuZGVsZXRlKHJlcy5yZXFJRCgpKTtcblxuICAgICAgfSwgb25DbG9zZTogKHJlc3VsdDogQ2xvc2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmFsbFJlcS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHZhbHVlKHtyZXM6bnVsbCwgZXJyOiBuZXcgQ29ubkVycm9yKG5ldyBFcnJvcihcImNsb3NlZCBieSBwZWVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKX0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFsbFJlcS5jbGVhcigpXG5cbiAgICAgICAgLy8g5byC5q2l5omn6KGMXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICB0aGlzLm9uUGVlckNsb3NlZCgpXG4gICAgICAgIH0sIDApXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzdGFydCBmcm9tIDEwXG4gICAgdGhpcy5yZXFJZCA9IDEwO1xuICAgIHRoaXMuYWxsUmVxID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVdzcyh3c3M6IHN0cmluZykge1xuICAgIGlmICh3c3MuaW5kZXhPZihcInM6Ly9cIikgPT09IC0xKSB7XG4gICAgICB3c3MgPSBcIndzOi8vXCIgKyB3c3M7XG4gICAgfVxuICAgIHRoaXMubmV0LnVwZGF0ZVdzcyh3c3MpXG4gIH1cblxuICBwdWJsaWMgc2V0UHVzaENhbGxiYWNrKGNsYiA6KHJlczpSZXN1bHQpPT52b2lkKSB7XG4gICAgdGhpcy5vblB1c2ggPSBjbGI7XG4gIH1cblxuICBwdWJsaWMgc2V0UGVlckNsb3NlZENhbGxiYWNrKGNsYiA6KCk9PnZvaWQpIHtcbiAgICB0aGlzLm9uUGVlckNsb3NlZCA9IGNsYjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZW5kKGRhdGE6IEFycmF5QnVmZmVyIHwgc3RyaW5nLCBoZWFkZXI/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIDogUHJvbWlzZTxbUmVzdWx0LCBFcnJvciB8IG51bGxdPiB7XG5cbiAgICBsZXQgZXJyID0gYXdhaXQgdGhpcy5uZXQuQ29ubmVjdCgpO1xuICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtlbXB0eVJlc3VsdCwgbmV3IENvbm5FcnJvcihlcnIpXTtcbiAgICB9XG5cbiAgICBsZXQgcmVxID0gbmV3IFJlcXVlc3QoZGF0YSwgaGVhZGVyKTtcbiAgICBsZXQgcmVxSWQgPSB0aGlzLnJlcUlkKys7XG4gICAgcmVxLlNldFJlcUlkKHJlcUlkKTtcblxuICAgIGxldCB0aW1lcjpudW1iZXJ8dW5kZWZpbmVkXG4gICAgbGV0IHJlcyA9IG5ldyBQcm9taXNlPFtSZXN1bHQsIEVycm9yIHwgbnVsbF0+KFxuICAgICAgKHJlc29sdmU6IChyZXQ6IFtSZXN1bHQsIEVycm9yIHwgbnVsbCBdKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIHRoaXMuYWxsUmVxLnNldChyZXFJZCwgKHJlc3VsdCk9PntcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG5cbiAgICAgICAgICBpZiAocmVzdWx0LmVyciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzb2x2ZShbZW1wdHlSZXN1bHQsIHJlc3VsdC5lcnJdKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCByZXMgPSByZXN1bHQucmVzXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IFN0YXR1cy5Paykge1xuICAgICAgICAgICAgcmVzb2x2ZShbZW1wdHlSZXN1bHQsIG5ldyBFcnJvcihuZXcgVXRmOChyZXMuZGF0YSgpKS50b1N0cmluZygpKV0pO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZShbbmV3IFJlc3VsdChuZXcgVXRmOChyZXMuZGF0YSgpKSksIG51bGxdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgdGhpcy5hbGxSZXEuZGVsZXRlKHJlcUlkKVxuICAgICAgICAgIHJlc29sdmUoW2VtcHR5UmVzdWx0LCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpXSk7XG4gICAgICAgIH0sIHRoaXMub3AucmVxdWVzdFRpbWVvdXQvTWlsbGlzZWNvbmQpYXMgdW5rbm93biBhcyBudW1iZXI7XG4gICAgICB9KVxuXG4gICAgZXJyID0gYXdhaXQgdGhpcy5uZXQuV3JpdGUocmVxLlRvRGF0YSgpKTtcbiAgICAvLyDlkJHnvZHnu5zlhpnmlbDmja7lpLHotKXvvIzkuZ/lupTor6XlvZLkuLrov57mjqXlsYLnmoTplJnor69cbiAgICBpZiAoZXJyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYWxsUmVxLmRlbGV0ZShyZXFJZClcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHJldHVybiBbZW1wdHlSZXN1bHQsIG5ldyBDb25uRXJyb3IoZXJyKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlY292ZXIoKTogUHJvbWlzZTxFcnJvcnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMubmV0LkNvbm5lY3QoKTtcbiAgfVxufVxuXG4iLCJcbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnQge1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUV2ZW50IGV4dGVuZHMgRXZlbnR7XG4gIHJlYWRvbmx5IGRhdGE6IEFycmF5QnVmZmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvc2VFdmVudCBleHRlbmRzIEV2ZW50e1xuICByZWFkb25seSBjb2RlOiBudW1iZXI7XG4gIHJlYWRvbmx5IHJlYXNvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgZXJyTXNnOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWJTb2NrZXRJbnRlcmZhY2Uge1xuICBvbmNsb3NlOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IENsb3NlRXZlbnQpID0+IGFueSk7XG4gIG9uZXJyb3I6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXJyb3JFdmVudCkgPT4gYW55KTtcbiAgb25tZXNzYWdlOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IE1lc3NhZ2VFdmVudCkgPT4gYW55KTtcbiAgb25vcGVuOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IEV2ZW50KSA9PiBhbnkpO1xuXG4gIGNsb3NlKGNvZGU/OiBudW1iZXIsIHJlYXNvbj86IHN0cmluZyk6IHZvaWQ7XG4gIHNlbmQoZGF0YTogQXJyYXlCdWZmZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlNvY2tldENvbnN0cnVjdG9yIHtcbiAgbmV3ICh1cmw6IHN0cmluZyk6IFdlYlNvY2tldEludGVyZmFjZVxufVxuXG5leHBvcnQgY2xhc3MgRHVtbXlXcyBpbXBsZW1lbnRzIFdlYlNvY2tldEludGVyZmFjZXtcbiAgb25jbG9zZSA9ICgpPT57fVxuICBvbmVycm9yID0gKCk9Pnt9XG4gIG9ubWVzc2FnZSA9ICgpPT57fVxuICBvbm9wZW4gPSAoKT0+e31cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgfVxuXG4gIHNlbmQoKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm90IHNldCBXZWJTb2NrZXRDb25zdHJ1Y3RvclwiKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcblxuICBwcml2YXRlIG1heENvbmN1cnJlbnQgOiBudW1iZXIgPSA1O1xuICBwcml2YXRlIG1heEJ5dGVzOiBudW1iZXIgPSA0ICogMTAyNCAqIDEwMjQ7XG4gIHByaXZhdGUgY29ubmVjdElEOiBzdHJpbmcgPSBcIlwiO1xuXG4gIHB1YmxpYyBvbmNsb3NlOiAoKGV2OiBDbG9zZUV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuICBwdWJsaWMgb25lcnJvcjogKChldjogRXJyb3JFdmVudCkgPT4gYW55KSA9ICgpPT57fTtcbiAgcHVibGljIG9ubWVzc2FnZTogKChldjogTWVzc2FnZUV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuICBwdWJsaWMgb25vcGVuOiAoKGV2OiBFdmVudCkgPT4gYW55KSA9ICgpPT57fTtcblxuICBwcml2YXRlIHdhaXRpbmdTZW5kID0gbmV3IEFycmF5PEFycmF5QnVmZmVyPigpXG4gIHByaXZhdGUgY29uY3VycmVudCA9IDBcblxuICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0SW50ZXJmYWNlO1xuXG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCB3ZWJzb2NrZXRDb25zdHJ1Y3RvcjogV2ViU29ja2V0Q29uc3RydWN0b3IpIHtcbiAgICB0aGlzLndlYnNvY2tldCA9IG5ldyB3ZWJzb2NrZXRDb25zdHJ1Y3Rvcih1cmwpXG5cbiAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKGV2OiBDbG9zZUV2ZW50KT0+e1xuICAgICAgdGhpcy5vbmNsb3NlKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KT0+e1xuICAgICAgdGhpcy5vbmVycm9yKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAocmVzdWx0OiBNZXNzYWdlRXZlbnQpPT57XG4gICAgICBsZXQgZXJyID0gdGhpcy5yZWFkSGFuZHNoYWtlKHJlc3VsdClcbiAgICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQub25jbG9zZSA9ICgpPT57fVxuICAgICAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKCk9Pnt9XG4gICAgICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9ICgpPT57fVxuICAgICAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAoKT0+e31cblxuICAgICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uZXJyb3Ioe2Vyck1zZzogZXJyLm1lc3NhZ2V9KVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyDorr7nva7kuLrnnJ/mraPnmoTmjqXmlLblh73mlbBcbiAgICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMub25tZXNzYWdlXG5cbiAgICAgIC8vIOaPoeaJi+e7k+adn+aJjeaYr+ecn+ato+eahG9ub3BlblxuICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9IChfOiBFdmVudCk9PntcbiAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICB9XG4gIH1cblxuICAvKlxuICAgIEhlYXJ0QmVhdF9zIHwgRnJhbWVUaW1lb3V0X3MgfCBNYXhDb25jdXJyZW50IHwgTWF4Qnl0ZXMgfCBjb25uZWN0IGlkXG4gICAgSGVhcnRCZWF0X3M6IDIgYnl0ZXMsIG5ldCBvcmRlclxuICAgIEZyYW1lVGltZW91dF9zOiAxIGJ5dGUgID09PTBcbiAgICBNYXhDb25jdXJyZW50OiAxIGJ5dGVcbiAgICBNYXhCeXRlczogNCBieXRlcywgbmV0IG9yZGVyXG4gICAgY29ubmVjdCBpZDogOCBieXRlcywgbmV0IG9yZGVyXG4qL1xuICBwcml2YXRlIHJlYWRIYW5kc2hha2UocmVzdWx0OiBNZXNzYWdlRXZlbnQpOiBFcnJvciB8IG51bGwge1xuICAgIGxldCBidWZmZXIgPSByZXN1bHQuZGF0YVxuICAgIGlmIChidWZmZXIuYnl0ZUxlbmd0aCAhPSAxNikge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcImxlbihoYW5kc2hha2UpICE9IDE2XCIpXG4gICAgfVxuXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcblxuICAgIHRoaXMubWF4Q29uY3VycmVudCA9IHZpZXcuZ2V0VWludDgoMyk7XG4gICAgdGhpcy5tYXhCeXRlcyA9IHZpZXcuZ2V0VWludDMyKDQpO1xuICAgIHRoaXMuY29ubmVjdElEID0gKFwiMDAwMDAwMDBcIiArIHZpZXcuZ2V0VWludDMyKDgpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTgpICtcbiAgICAgIChcIjAwMDAwMDAwXCIgKyB2aWV3LmdldFVpbnQzMigxMikudG9TdHJpbmcoMTYpKS5zbGljZSgtOCk7XG4gICAgY29uc29sZS5sb2coXCJjb25uZWN0SUQgPSBcIiwgdGhpcy5jb25uZWN0SUQpXG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcHVibGljIHJlY2VpdmVkT25lUmVzcG9uc2UoKTp2b2lkIHtcbiAgICB0aGlzLmNvbmN1cnJlbnQtLVxuICAgIC8vIOmYsuW+oeaAp+S7o+eggVxuICAgIGlmICh0aGlzLmNvbmN1cnJlbnQgPCAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJjb25uZWN0aW9uLmNvbmN1cnJlbnQgPCAwXCIpXG4gICAgICB0aGlzLmNvbmN1cnJlbnQgPSAwXG4gICAgfVxuXG4gICAgdGhpcy5fc2VuZCgpXG4gIH1cblxuICBwcml2YXRlIF9zZW5kKCk6dm9pZCB7XG4gICAgaWYgKHRoaXMuY29uY3VycmVudCA+IHRoaXMubWF4Q29uY3VycmVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2FpdGluZ1NlbmQubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuY29uY3VycmVudCsrXG5cbiAgICB0aGlzLndlYnNvY2tldC5zZW5kKHRoaXMud2FpdGluZ1NlbmQuc2hpZnQoKSEpXG4gIH1cblxuICBwdWJsaWMgc2VuZChkYXRhOiBBcnJheUJ1ZmZlcik6IEVycm9yIHwgbnVsbCB7XG4gICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCA+IHRoaXMubWF4Qnl0ZXMpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJkYXRhIGlzIHRvbyBsYXJnZSEgTXVzdCBiZSBsZXNzIHRoYW4gXCIgKyB0aGlzLm1heEJ5dGVzLnRvU3RyaW5nKCkgKyBcIi4gXCIpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0aW5nU2VuZC5wdXNoKGRhdGEpXG4gICAgdGhpcy5fc2VuZCgpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHB1YmxpYyBTZW5kRm9yY2UoZGF0YTogQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLndlYnNvY2tldC5zZW5kKGRhdGEpXG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy53ZWJzb2NrZXQuY2xvc2UoKVxuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIENvbm5FcnJvciBpbXBsZW1lbnRzIEVycm9ye1xuICBtZXNzYWdlOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIHN0YWNrPzogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IoZXJyb3I6IEVycm9yKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZXJyb3IubWVzc2FnZVxuICAgIHRoaXMubmFtZSA9IGVycm9yLm5hbWVcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxufSIsIlxuLyoqXG5cbiBjb250ZW50IHByb3RvY29sOlxuICAgcmVxdWVzdCAtLS1cbiAgICAgcmVxaWQgfCBoZWFkZXJzIHwgaGVhZGVyLWVuZC1mbGFnIHwgZGF0YVxuICAgICByZXFpZDogNCBieXRlcywgbmV0IG9yZGVyO1xuICAgICBoZWFkZXJzOiA8IGtleS1sZW4gfCBrZXkgfCB2YWx1ZS1sZW4gfCB2YWx1ZSA+IC4uLiA7ICBbb3B0aW9uYWxdXG4gICAgIGtleS1sZW46IDEgYnl0ZSwgIGtleS1sZW4gPSBzaXplb2Yoa2V5KTtcbiAgICAgdmFsdWUtbGVuOiAxIGJ5dGUsIHZhbHVlLWxlbiA9IHNpemVvZih2YWx1ZSk7XG4gICAgIGhlYWRlci1lbmQtZmxhZzogMSBieXRlLCA9PT0gMDtcbiAgICAgZGF0YTogICAgICAgW29wdGlvbmFsXVxuXG4gICAgICByZXFpZCA9IDE6IGNsaWVudCBwdXNoIGFjayB0byBzZXJ2ZXIuXG4gICAgICAgICAgICBhY2s6IG5vIGhlYWRlcnM7XG4gICAgICAgICAgICBkYXRhOiBwdXNoSWQuIDQgYnl0ZXMsIG5ldCBvcmRlcjtcblxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgcmVzcG9uc2UgLS0tXG4gICAgIHJlcWlkIHwgc3RhdHVzIHwgZGF0YVxuICAgICByZXFpZDogNCBieXRlcywgbmV0IG9yZGVyO1xuICAgICBzdGF0dXM6IDEgYnl0ZSwgMC0tLXN1Y2Nlc3MsIDEtLS1mYWlsZWRcbiAgICAgZGF0YTogaWYgc3RhdHVzPT1zdWNjZXNzLCBkYXRhPTxhcHAgZGF0YT4gICAgW29wdGlvbmFsXVxuICAgICBpZiBzdGF0dXM9PWZhaWxlZCwgZGF0YT08ZXJyb3IgcmVhc29uPlxuXG5cbiAgICByZXFpZCA9IDE6IHNlcnZlciBwdXNoIHRvIGNsaWVudFxuICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICBkYXRhOiBmaXJzdCA0IGJ5dGVzIC0tLSBwdXNoSWQsIG5ldCBvcmRlcjtcbiAgICAgICAgICAgICAgICBsYXN0IC0tLSByZWFsIGRhdGFcblxuICovXG5cbmltcG9ydCB7VXRmOH0gZnJvbSBcIi4vdXRmOFwiO1xuXG5leHBvcnQgY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgYnVmZmVyOiBBcnJheUJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihkYXRhOkFycmF5QnVmZmVyfHN0cmluZywgaGVhZGVyPzpNYXA8c3RyaW5nLHN0cmluZz4pIHtcbiAgICBsZXQgbGVuID0gNDtcbiAgICBoZWFkZXIgPSBoZWFkZXIgfHwgbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgIGxldCBoZWFkZXJBcnIgPSBuZXcgQXJyYXk8e2tleTpVdGY4LCB2YWx1ZTpVdGY4fT4oKTtcblxuICAgIGhlYWRlci5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZywgXzogTWFwPHN0cmluZywgc3RyaW5nPik9PntcbiAgICAgIGxldCB1dGY4ID0ge2tleTogbmV3IFV0Zjgoa2V5KSwgdmFsdWU6IG5ldyBVdGY4KHZhbHVlKX07XG4gICAgICBoZWFkZXJBcnIucHVzaCh1dGY4KTtcbiAgICAgIGxlbiArPSAxICsgdXRmOC5rZXkuYnl0ZUxlbmd0aCArIDEgKyB1dGY4LnZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgfSk7XG5cbiAgICBsZXQgYm9keSA9IG5ldyBVdGY4KGRhdGEpO1xuXG4gICAgbGVuICs9IDEgKyBib2R5LmJ5dGVMZW5ndGg7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihsZW4pO1xuXG4gICAgbGV0IHBvcyA9IDQ7XG4gICAgZm9yIChsZXQgaCBvZiBoZWFkZXJBcnIpIHtcbiAgICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50OChwb3MsIGgua2V5LmJ5dGVMZW5ndGgpO1xuICAgICAgcG9zKys7XG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIpKS5zZXQoaC5rZXkucmF3LCBwb3MpO1xuICAgICAgcG9zICs9IGgua2V5LmJ5dGVMZW5ndGg7XG4gICAgICAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKSkuc2V0VWludDgocG9zLCBoLnZhbHVlLmJ5dGVMZW5ndGgpO1xuICAgICAgcG9zKys7XG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIpKS5zZXQoaC52YWx1ZS5yYXcsIHBvcyk7XG4gICAgICBwb3MgKz0gaC52YWx1ZS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKSkuc2V0VWludDgocG9zLCAwKTtcbiAgICBwb3MrKztcblxuICAgIChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLnNldChib2R5LnJhdywgcG9zKTtcbiAgfVxuXG4gIHB1YmxpYyBTZXRSZXFJZChpZDpudW1iZXIpIHtcbiAgICAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKSkuc2V0VWludDMyKDAsIGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBUb0RhdGEoKTpBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyXG4gIH1cblxufVxuXG5leHBvcnQgZW51bSBTdGF0dXMge1xuICBPayxcbiAgRmFpbGVkXG59XG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zZSB7XG5cbiAgcHVibGljIHJlYWRvbmx5IHN0YXR1czogU3RhdHVzO1xuICBwcml2YXRlIHJlYWRvbmx5IGJ1ZmZlcjogVWludDhBcnJheTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgIHRoaXMuc3RhdHVzID0gdGhpcy5idWZmZXJbNF0gPT0gMD9TdGF0dXMuT2sgOiBTdGF0dXMuRmFpbGVkO1xuICB9XG5cbiAgcHVibGljIHJlcUlEKCk6bnVtYmVyIHtcbiAgICByZXR1cm4gKG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlci5idWZmZXIpKS5nZXRVaW50MzIoMCk7XG4gIH1cblxuICBwdWJsaWMgZGF0YSgpOkFycmF5QnVmZmVyIHtcblxuICAgIGxldCBvZmZzZXQgPSA1XG4gICAgaWYgKHRoaXMuaXNQdXNoKCkpIHtcbiAgICAgIC8vIHB1c2hJZFxuICAgICAgb2Zmc2V0ICs9IDRcbiAgICB9XG5cbiAgICBpZiAodGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA8PSBvZmZzZXQpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5idWZmZXIuc2xpY2Uob2Zmc2V0KS5idWZmZXJcbiAgICAvLyBsZXQgdXRmOCA9IG5ldyBVdGY4KHRoaXMuYnVmZmVyLnNsaWNlKG9mZnNldCkpO1xuICAgIC8vIHJldHVybiB1dGY4LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgaXNQdXNoKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVxSUQoKSA9PT0gMTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdQdXNoQWNrKCk6IEFycmF5QnVmZmVyIHtcbiAgICBpZiAoIXRoaXMuaXNQdXNoKCkgfHwgdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA8PSA0KzErNCkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIH1cblxuICAgIGxldCByZXQgPSBuZXcgQXJyYXlCdWZmZXIoNCArIDEgKyA0KVxuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KHJldClcbiAgICB2aWV3LnNldFVpbnQzMigwLCAxKVxuICAgIHZpZXcuc2V0VWludDgoNCwgMClcbiAgICB2aWV3LnNldFVpbnQzMig1LCAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLmJ1ZmZlcikpLmdldFVpbnQzMig1KSlcblxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUVycm9yKHJlcUlkOm51bWJlciwgZXJyOiBFcnJvcik6UmVzcG9uc2Uge1xuICAgIGxldCB1dGY4ID0gbmV3IFV0ZjgoZXJyLm1lc3NhZ2UpO1xuICAgIGxldCBidWZmZXIgPSBuZXcgVWludDhBcnJheSg0KzEgKyB1dGY4LmJ5dGVMZW5ndGgpO1xuICAgIChuZXcgRGF0YVZpZXcoYnVmZmVyLmJ1ZmZlcikpLnNldFVpbnQzMigwLCByZXFJZCk7XG4gICAgYnVmZmVyWzRdID0gMTtcbiAgICBidWZmZXIuc2V0KHV0ZjgucmF3LCA1KTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoYnVmZmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEdXJhdGlvbiwgTWlsbGlzZWNvbmR9IGZyb20gXCJ0cy14dXRpbHNcIlxuaW1wb3J0IHtDb25uZWN0aW9uLCBNZXNzYWdlRXZlbnQsIENsb3NlRXZlbnQsIEVycm9yRXZlbnQsIFdlYlNvY2tldENvbnN0cnVjdG9yfSBmcm9tIFwiLi9jb25uZWN0aW9uXCJcblxuXG5pbnRlcmZhY2UgTmV0SGFuZGxlIHtcbiAgb25NZXNzYWdlKHZhbHVlOiBBcnJheUJ1ZmZlcik6IHZvaWQ7XG5cbiAgb25DbG9zZShyZXN1bHQ6IENsb3NlRXZlbnQpOiB2b2lkXG5cbiAgb25FcnJvcj86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIE5ldCB7XG5cbiAgcHJpdmF0ZSBjb25uOiBDb25uZWN0aW9uIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgd2FpdGluZ0Nvbm5lY3Q6IEFycmF5PChyZXQ6IEVycm9yIHwgbnVsbCkgPT4gdm9pZD4gPSBuZXcgQXJyYXk8KHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd3NzOiBzdHJpbmcsIHByaXZhdGUgY29ubmVjdFRpbWVvdXQ6IER1cmF0aW9uXG4gICAgICAgICAgICAgICwgcHJpdmF0ZSB3ZWJTb2NrZXRDb25zdHJ1Y3RvcjogV2ViU29ja2V0Q29uc3RydWN0b3JcbiAgICAgICAgICAgICAgLCBwcml2YXRlIGhhbmRsZTogTmV0SGFuZGxlKSB7XG4gIH1cblxuICBwcml2YXRlIGRvV2FpdGluZ0Nvbm5lY3QoZXJyOiBFcnJvciB8IG51bGwpIHtcbiAgICBmb3IgKGxldCB3YWl0aW5nIG9mIHRoaXMud2FpdGluZ0Nvbm5lY3QpIHtcbiAgICAgIHdhaXRpbmcoZXJyKVxuICAgIH1cbiAgICB0aGlzLndhaXRpbmdDb25uZWN0ID0gbmV3IEFycmF5PChyZXQ6IEVycm9yIHwgbnVsbCkgPT4gdm9pZD4oKTtcbiAgfVxuXG4gIHByaXZhdGUgaW52YWxpZFdlYnNvY2tldCgpIHtcbiAgICB0aGlzLmNvbm4hLm9ubWVzc2FnZSA9ICgpID0+IHt9XG4gICAgdGhpcy5jb25uIS5vbm9wZW4gPSAoKSA9PiB7fVxuICAgIHRoaXMuY29ubiEub25jbG9zZSA9ICgpID0+IHt9XG4gICAgdGhpcy5jb25uIS5vbmVycm9yID0gKCkgPT4ge31cbiAgICB0aGlzLmNvbm4gPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVdzcyh3c3M6IHN0cmluZykge1xuICAgIHRoaXMud3NzID0gd3NzXG4gIH1cblxuICAvLyDph4fnlKjmnIDlpJrlj6rmnInkuIDmnaHov57mjqXlpITkuo7mtLvot4PnirbmgIHnmoTnrZbnlaXvvIjljIXmi6zvvJpjb25uZWN0aW5nL2Nvbm5lY3QvY2xvc2luZynvvIzov57mjqXnmoTliKTor7vlj6/ku6XljZXkuIDljJbvvIzlr7nkuIrlsYLmmrTpnLLnmoTosIPnlKjlj6/ku6XnroDljZXljJbjgIJcbiAgLy8g5L2G5a+55LiA5Lqb5p6B6ZmQ5pON5L2c5Y+v6IO95YW35pyJ5rue5ZCO5oCn77yM5q+U5aaC5q2j5aSE5LqOY2xvc2luZ+eahOaXtuWAmSjku6PnoIHlvILmraXmiafooYzkuK0p77yM5paw55qEQ29ubmVjdOiwg+eUqOS4jeiDveeri+WNs+i/nuaOpeOAguS4uuS6huWwveWPr+iDveeahOmBv+WFjei/meenjeaDheWGte+8jFxuICAvLyDlnKhvbmVycm9yIOWPiiBvbmNsb3NlIOS4remDveS9v+eUqOS6huWQjOatpeS7o+eggeOAglxuICAvLyDlkI7mnJ/lpoLmnpzph4fnlKjlpJrmnaHmtLvot4PnirbmgIHnmoTnrZbnlaUo5q+U5aaC77ya5LiA5p2hY2xvc2luZ++8jOS4gOadoWNvbm5lY3Rpbmcp77yM6ZyA6KaB6ICD6JmRbmV0LmhhbmRsZeeahOWumuS5ieWPiuW8guatpeaDheWGteeahOaXtuW6j+mXrumimOOAglxuICBwdWJsaWMgYXN5bmMgQ29ubmVjdCgpOiBQcm9taXNlPEVycm9yIHwgbnVsbD4ge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8RXJyb3IgfCBudWxsPigocmVzb2x2ZTogKHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkKSA9PiB7XG4gICAgICB0aGlzLndhaXRpbmdDb25uZWN0LnB1c2gocmVzb2x2ZSk7XG4gICAgICBpZiAodGhpcy5jb25uICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgLy8gaW52YWxpZCB0aGlzLndlYnNvY2tldFxuICAgICAgICB0aGlzLmludmFsaWRXZWJzb2NrZXQoKVxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZG9XYWl0aW5nQ29ubmVjdChuZXcgRXJyb3IoXCJjb25uZWN0IHRpbWVvdXRcIikpXG4gICAgICB9LCB0aGlzLmNvbm5lY3RUaW1lb3V0L01pbGxpc2Vjb25kKVxuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmNvbm4gPSBuZXcgQ29ubmVjdGlvbih0aGlzLndzcywgdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvcik7XG4gICAgICB9Y2F0Y2ggKGUpIHtcbiAgICAgICAgLy8g55uu5YmN6KeC5rWL5Yiw77yaMeOAgeWmguaenHVybOWGmemUme+8jOWImeaYr+ebtOaOpeWcqG5ld+WwseS8muaKm+WHuuW8guW4uO+8mzLjgIHlpoLmnpzmmK/nnJ/mraPnmoTov57mjqXlpLHotKXvvIzliJnkvJrop6blj5FvbmVycm9y77yM5ZCM5pe26L+Y5Lya6Kem5Y+Rb25jbG9zZVxuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG5ldyBFcnJvcihlIGFzIHN0cmluZykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gKHJlc3VsdDogTWVzc2FnZUV2ZW50KT0+e1xuICAgICAgICB0aGlzLmhhbmRsZS5vbk1lc3NhZ2UocmVzdWx0LmRhdGEpXG4gICAgICB9O1xuICAgICAgdGhpcy5jb25uLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRoaXMuZG9XYWl0aW5nQ29ubmVjdChudWxsKTtcbiAgICAgIH07XG4gICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IChyZXN1bHQ6IENsb3NlRXZlbnQpID0+IHtcbiAgICAgICAgLy8g5q2k5aSE5Y+q6ICD6JmR6L+Y5aSE5LqO6L+e5o6l55qE5oOF5Ya177yM5YW25LuW5oOF5Ya15Y+v5Lul5Y+C6KeBIG9uZXJyb3LnmoTlpITnkIZcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsb3NlRXZlbnQgPSB7Y29kZTpyZXN1bHQuY29kZSwgcmVhc29uOiByZXN1bHQucmVhc29ufVxuICAgICAgICBpZiAoY2xvc2VFdmVudC5yZWFzb24gPT09IFwiXCIgfHwgY2xvc2VFdmVudC5yZWFzb24gPT09IHVuZGVmaW5lZCB8fCBjbG9zZUV2ZW50LnJlYXNvbiA9PT0gbnVsbCkge1xuICAgICAgICAgIGNsb3NlRXZlbnQucmVhc29uID0gXCJ1bmtub3duXCJcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oXCJuZXQtLS1vbkNsb3NlZCwgXCIsIEpTT04uc3RyaW5naWZ5KGNsb3NlRXZlbnQpKTtcbiAgICAgICAgdGhpcy5oYW5kbGUub25DbG9zZShjbG9zZUV2ZW50KTtcbiAgICAgICAgdGhpcy5jb25uPy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5jb25uLm9uZXJyb3IgPSAocmVzdWx0OiBFcnJvckV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuZXQtLS1vbkVycm9yXCIsIHJlc3VsdCk7XG4gICAgICAgIC8vIOmcgOimgeiAg+iZkei/nuaOpeWksei0peeahOmYsuW+oeaAp+S7o+egge+8jHdlYnNvY2tldOaOpeWPo+ayoeacieaYjuehruaMh+WHuui/nuaOpeWksei0peeUseWTquS4quaOpeWPo+i/lOWbnu+8jOaVhei/memHjOWKoOS4iui/nuaOpeWksei0peeahOWkhOeQhlxuICAgICAgICAvLyDnm67liY3op4LmtYvliLDvvJox44CB5aaC5p6cdXJs5YaZ6ZSZ77yM5YiZ5piv55u05o6l5ZyobmV35bCx5Lya5oqb5Ye65byC5bi477ybMuOAgeWmguaenOaYr+ecn+ato+eahOi/nuaOpeWksei0pe+8jOWImeS8muinpuWPkW9uZXJyb3LvvIzlkIzml7bov5jkvJrop6blj5FvbmNsb3NlXG5cbiAgICAgICAgLy8g5rKh5pyJ5byA5aeL6L+e5o6l5oiW6ICF5YW25LuW5Lu75L2V5oOF5Ya16YCg5oiQdGhpcy5jb25u6KKr572u5Li656m677yM6YO955u05o6l6L+U5ZueXG4gICAgICAgIGlmICh0aGlzLmNvbm4gPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWTjeW6lOS6hm9uZXJyb3Ig5bCx5LiN5YaN5ZON5bqUb25jbG9zZVxuICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9ICgpPT57fVxuXG4gICAgICAgIC8vIOebruWJjeWBmuWmguS4i+eahOiuvuWumu+8muS4gOS4quS4iuWxgueahHBlbmRpbmfosIPnlKgo6L+e5o6l5oiW6ICF6K+35rGC562JKe+8jOimgeS5iOaYr+WcqOetieW+hei/nuaOpeS4rVxuICAgICAgICAvLyDopoHkuYjmmK/lnKjnrYnlvoVyZXNwb25zZeS4reOAguWNs+S9v+WHuueOsOW8guW4uO+8jOS4iuWxguS4gOiIrOWPr+iDvemDveaciei2heaXtu+8jOS7jeS4jeS8muS4gOebtOiiq3BlbmRpbmdcbiAgICAgICAgLy8gdG9kbzog5piv5ZCm5Lya5pyJ5ZCM5pe25Ye6546w5ZyoIOetiei/nuaOpSDkuI4g562J5ZON5bqUIOS4re+8n1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRoaXMuZG9XYWl0aW5nQ29ubmVjdChuZXcgRXJyb3IocmVzdWx0LmVyck1zZykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFuZGxlLm9uQ2xvc2Uoe2NvZGU6IC0xLCByZWFzb246IFwib25lcnJvcjogXCIgKyByZXN1bHQuZXJyTXNnfSk7XG4gICAgICAgICAgaWYgKHRoaXMuaGFuZGxlLm9uRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlLm9uRXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbm4/LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgV3JpdGUoZGF0YTogQXJyYXlCdWZmZXIpOiBFcnJvciB8IG51bGwge1xuICAgIGlmICh0aGlzLmNvbm4gPT0gbnVsbCB8fCAhdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJub3QgY29ubmVjdGVkXCIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29ubi5zZW5kKGRhdGEpXG4gIH1cblxuICBwdWJsaWMgV3JpdGVGb3JjZShkYXRhOiBBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuY29ubj8uU2VuZEZvcmNlKGRhdGEpXG4gIH1cblxuICBwdWJsaWMgcmVjZWl2ZWRPbmVSZXNwb25zZSgpOnZvaWQge1xuICAgIHRoaXMuY29ubj8ucmVjZWl2ZWRPbmVSZXNwb25zZSgpXG4gIH1cblxufSIsImltcG9ydCB7RHVyYXRpb24sIFNlY29uZH0gZnJvbSBcInRzLXh1dGlsc1wiXG5pbXBvcnQge0R1bW15V3MsIFdlYlNvY2tldENvbnN0cnVjdG9yfSBmcm9tIFwiLi9jb25uZWN0aW9uXCJcblxuZXhwb3J0IGNsYXNzIG9wdGlvbiB7XG4gIHJlcXVlc3RUaW1lb3V0OiBEdXJhdGlvbiA9IDMwKlNlY29uZFxuICBjb25uZWN0VGltZW91dDogRHVyYXRpb24gPSAzMCpTZWNvbmRcbiAgd2ViU29ja2V0Q29uc3RydWN0b3I6IFdlYlNvY2tldENvbnN0cnVjdG9yID0gRHVtbXlXc1xufVxuXG5leHBvcnQgdHlwZSBPcHRpb24gPSAob3AgOm9wdGlvbik9PnZvaWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXF1ZXN0VGltZW91dChkIDogRHVyYXRpb24pOiBPcHRpb24ge1xuICByZXR1cm4gKG9wIDpvcHRpb24pID0+IHtcbiAgICBvcC5yZXF1ZXN0VGltZW91dCA9IGRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29ubmVjdFRpbWVvdXQoZCA6RHVyYXRpb24pOiBPcHRpb24ge1xuICByZXR1cm4gKG9wIDpvcHRpb24pID0+IHtcbiAgICBvcC5jb25uZWN0VGltZW91dCA9IGRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gV2ViU29ja2V0KHdlYlNvY2tldENvbnN0cnVjdG9yOiBXZWJTb2NrZXRDb25zdHJ1Y3Rvcik6IE9wdGlvbiB7XG4gIHJldHVybiAob3AgOm9wdGlvbikgPT4ge1xuICAgIG9wLndlYlNvY2tldENvbnN0cnVjdG9yID0gd2ViU29ja2V0Q29uc3RydWN0b3JcbiAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgVXRmOCB7XG4gIHB1YmxpYyByZWFkb25seSByYXc6IFVpbnQ4QXJyYXk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5kZXhlczogQXJyYXk8bnVtYmVyPjtcbiAgcHJpdmF0ZSBzdHI6c3RyaW5nfG51bGw7XG4gIHB1YmxpYyByZWFkb25seSBieXRlTGVuZ3RoOm51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGxlbmd0aDpudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IEFycmF5QnVmZmVyfHN0cmluZykge1xuICAgIHRoaXMuaW5kZXhlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnJhdyA9IG5ldyBVaW50OEFycmF5KGlucHV0KTtcbiAgICAgIGxldCB1dGY4aSA9IDA7XG4gICAgICB3aGlsZSAodXRmOGkgPCB0aGlzLnJhdy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzLnB1c2godXRmOGkpO1xuICAgICAgICB1dGY4aSArPSBVdGY4LmdldFVURjhDaGFyTGVuZ3RoKFV0ZjgubG9hZFVURjhDaGFyQ29kZSh0aGlzLnJhdywgdXRmOGkpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKHV0ZjhpKTsgIC8vIGVuZCBmbGFnXG5cbiAgICAgIHRoaXMuc3RyID0gbnVsbDtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0ciA9IGlucHV0O1xuXG4gICAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICAgIGZvciAobGV0IGNoIG9mIGlucHV0KSB7XG4gICAgICAgIGxlbmd0aCArPSBVdGY4LmdldFVURjhDaGFyTGVuZ3RoKGNoLmNvZGVQb2ludEF0KDApISlcbiAgICAgIH1cbiAgICAgIHRoaXMucmF3ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcblxuICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgIGZvciAobGV0IGNoIG9mIGlucHV0KSB7XG4gICAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgaW5kZXggPSBVdGY4LnB1dFVURjhDaGFyQ29kZSh0aGlzLnJhdywgY2guY29kZVBvaW50QXQoMCkhLCBpbmRleClcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKGluZGV4KTsgLy8gZW5kIGZsYWdcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuaW5kZXhlcy5sZW5ndGggLSAxO1xuICAgIHRoaXMuYnl0ZUxlbmd0aCA9IHRoaXMucmF3LmJ5dGVMZW5ndGg7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGxvYWRVVEY4Q2hhckNvZGUoYUNoYXJzOiBVaW50OEFycmF5LCBuSWR4OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgbGV0IG5MZW4gPSBhQ2hhcnMubGVuZ3RoLCBuUGFydCA9IGFDaGFyc1tuSWR4XTtcblxuICAgIHJldHVybiBuUGFydCA+IDI1MSAmJiBuUGFydCA8IDI1NCAmJiBuSWR4ICsgNSA8IG5MZW4gP1xuICAgICAgLyogKG5QYXJ0IC0gMjUyIDw8IDMwKSBtYXkgYmUgbm90IHNhZmUgaW4gRUNNQVNjcmlwdCEgU28uLi46ICovXG4gICAgICAvKiBzaXggYnl0ZXMgKi8gKG5QYXJ0IC0gMjUyKSAqIDEwNzM3NDE4MjQgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAyNClcbiAgICAgICsgKGFDaGFyc1tuSWR4ICsgMl0gLSAxMjggPDwgMTgpICsgKGFDaGFyc1tuSWR4ICsgM10gLSAxMjggPDwgMTIpXG4gICAgICArIChhQ2hhcnNbbklkeCArIDRdIC0gMTI4IDw8IDYpICsgYUNoYXJzW25JZHggKyA1XSAtIDEyOFxuICAgICAgOiBuUGFydCA+IDI0NyAmJiBuUGFydCA8IDI1MiAmJiBuSWR4ICsgNCA8IG5MZW4gP1xuICAgICAgICAvKiBmaXZlIGJ5dGVzICovIChuUGFydCAtIDI0OCA8PCAyNCkgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAxOClcbiAgICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCAxMikgKyAoYUNoYXJzW25JZHggKyAzXSAtIDEyOCA8PCA2KVxuICAgICAgICArIGFDaGFyc1tuSWR4ICsgNF0gLSAxMjhcbiAgICAgICAgOiBuUGFydCA+IDIzOSAmJiBuUGFydCA8IDI0OCAmJiBuSWR4ICsgMyA8IG5MZW4gP1xuICAgICAgICAgIC8qIGZvdXIgYnl0ZXMgKi8oblBhcnQgLSAyNDAgPDwgMTgpICsgKGFDaGFyc1tuSWR4ICsgMV0gLSAxMjggPDwgMTIpXG4gICAgICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCA2KSArIGFDaGFyc1tuSWR4ICsgM10gLSAxMjhcbiAgICAgICAgICA6IG5QYXJ0ID4gMjIzICYmIG5QYXJ0IDwgMjQwICYmIG5JZHggKyAyIDwgbkxlbiA/XG4gICAgICAgICAgICAvKiB0aHJlZSBieXRlcyAqLyAoblBhcnQgLSAyMjQgPDwgMTIpICsgKGFDaGFyc1tuSWR4ICsgMV0gLSAxMjggPDwgNilcbiAgICAgICAgICAgICsgYUNoYXJzW25JZHggKyAyXSAtIDEyOFxuICAgICAgICAgICAgOiBuUGFydCA+IDE5MSAmJiBuUGFydCA8IDIyNCAmJiBuSWR4ICsgMSA8IG5MZW4gP1xuICAgICAgICAgICAgICAvKiB0d28gYnl0ZXMgKi8gKG5QYXJ0IC0gMTkyIDw8IDYpICsgYUNoYXJzW25JZHggKyAxXSAtIDEyOFxuICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgIC8qIG9uZSBieXRlICovIG5QYXJ0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcHV0VVRGOENoYXJDb2RlKGFUYXJnZXQ6IFVpbnQ4QXJyYXksIG5DaGFyOiBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgblB1dEF0OiBudW1iZXIpOm51bWJlciB7XG5cbiAgICBsZXQgbklkeCA9IG5QdXRBdDtcblxuICAgIGlmIChuQ2hhciA8IDB4ODAgLyogMTI4ICovKSB7XG4gICAgICAvKiBvbmUgYnl0ZSAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gbkNoYXI7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4ODAwIC8qIDIwNDggKi8pIHtcbiAgICAgIC8qIHR3byBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhjMCAvKiAxOTIgKi8gKyAobkNoYXIgPj4+IDYpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgaWYgKG5DaGFyIDwgMHgxMDAwMCAvKiA2NTUzNiAqLykge1xuICAgICAgLyogdGhyZWUgYnl0ZXMgKi9cbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ZTAgLyogMjI0ICovICsgKG5DaGFyID4+PiAxMik7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH0gZWxzZSBpZiAobkNoYXIgPCAweDIwMDAwMCAvKiAyMDk3MTUyICovKSB7XG4gICAgICAvKiBmb3VyIGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGYwIC8qIDI0MCAqLyArIChuQ2hhciA+Pj4gMTgpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxMikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gNikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKG5DaGFyICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4NDAwMDAwMCAvKiA2NzEwODg2NCAqLykge1xuICAgICAgLyogZml2ZSBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhmOCAvKiAyNDggKi8gKyAobkNoYXIgPj4+IDI0KTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTgpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDEyKSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiA2KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgLyogaWYgKG5DaGFyIDw9IDB4N2ZmZmZmZmYpICovIHsgLyogMjE0NzQ4MzY0NyAqL1xuICAgICAgLyogc2l4IGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGZjIC8qIDI1MiAqLyArIC8qIChuQ2hhciA+Pj4gMzApIG1heSBiZSBub3Qgc2FmZSBpbiBFQ01BU2NyaXB0ISBTby4uLjogKi8gKG5DaGFyIC8gMTA3Mzc0MTgyNCk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDI0KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxOCkgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTIpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH1cblxuICAgIHJldHVybiBuSWR4O1xuXG4gIH07XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0VVRGOENoYXJMZW5ndGgobkNoYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIG5DaGFyIDwgMHg4MCA/IDEgOiBuQ2hhciA8IDB4ODAwID8gMiA6IG5DaGFyIDwgMHgxMDAwMFxuICAgICAgPyAzIDogbkNoYXIgPCAweDIwMDAwMCA/IDQgOiBuQ2hhciA8IDB4NDAwMDAwMCA/IDUgOiA2O1xuICB9XG5cblxuICAvLyBwcml2YXRlIHN0YXRpYyBsb2FkVVRGMTZDaGFyQ29kZShhQ2hhcnM6IFVpbnQxNkFycmF5LCBuSWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAvL1xuICAvLyAgIC8qIFVURi0xNiB0byBET01TdHJpbmcgZGVjb2RpbmcgYWxnb3JpdGhtICovXG4gIC8vICAgbGV0IG5GcnN0Q2hyID0gYUNoYXJzW25JZHhdO1xuICAvL1xuICAvLyAgIHJldHVybiBuRnJzdENociA+IDB4RDdCRiAvKiA1NTIzMSAqLyAmJiBuSWR4ICsgMSA8IGFDaGFycy5sZW5ndGggP1xuICAvLyAgICAgKG5GcnN0Q2hyIC0gMHhEODAwIC8qIDU1Mjk2ICovIDw8IDEwKSArIGFDaGFyc1tuSWR4ICsgMV0gKyAweDI0MDAgLyogOTIxNiAqL1xuICAvLyAgICAgOiBuRnJzdENocjtcbiAgLy8gfVxuICAvL1xuICAvLyBwcml2YXRlIHN0YXRpYyBwdXRVVEYxNkNoYXJDb2RlKGFUYXJnZXQ6IFVpbnQxNkFycmF5LCBuQ2hhcjogbnVtYmVyLCBuUHV0QXQ6IG51bWJlcik6bnVtYmVyIHtcbiAgLy9cbiAgLy8gICBsZXQgbklkeCA9IG5QdXRBdDtcbiAgLy9cbiAgLy8gICBpZiAobkNoYXIgPCAweDEwMDAwIC8qIDY1NTM2ICovKSB7XG4gIC8vICAgICAvKiBvbmUgZWxlbWVudCAqL1xuICAvLyAgICAgYVRhcmdldFtuSWR4KytdID0gbkNoYXI7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIC8qIHR3byBlbGVtZW50cyAqL1xuICAvLyAgICAgYVRhcmdldFtuSWR4KytdID0gMHhEN0MwIC8qIDU1MjMyICovICsgKG5DaGFyID4+PiAxMCk7XG4gIC8vICAgICBhVGFyZ2V0W25JZHgrK10gPSAweERDMDAgLyogNTYzMjAgKi8gKyAobkNoYXIgJiAweDNGRiAvKiAxMDIzICovKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgcmV0dXJuIG5JZHg7XG4gIC8vIH1cbiAgLy9cbiAgLy8gcHJpdmF0ZSBzdGF0aWMgZ2V0VVRGMTZDaGFyTGVuZ3RoKG5DaGFyOiBudW1iZXIpOiBudW1iZXIge1xuICAvLyAgIHJldHVybiBuQ2hhciA8IDB4MTAwMDAgPyAxIDogMjtcbiAgLy8gfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgaWYgKHRoaXMuc3RyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0clxuICAgIH1cblxuICAgIGxldCBjb2RlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgZm9yIChsZXQgdXRmOGkgPSAwOyB1dGY4aSA8IHRoaXMucmF3Lmxlbmd0aDspIHtcbiAgICAgIGxldCBjb2RlID0gVXRmOC5sb2FkVVRGOENoYXJDb2RlKHRoaXMucmF3LCB1dGY4aSk7XG4gICAgICBjb2Rlcy5wdXNoKGNvZGUpO1xuICAgICAgdXRmOGkgKz0gVXRmOC5nZXRVVEY4Q2hhckxlbmd0aChjb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0ciA9IFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVzKTtcblxuICAgIHJldHVybiB0aGlzLnN0cjtcbiAgfVxuXG4gIHB1YmxpYyBjb2RlUG9pbnRBdChpbmRleDogbnVtYmVyKTpBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMucmF3LnNsaWNlKHRoaXMuaW5kZXhlc1tpbmRleF0sIHRoaXMuaW5kZXhlc1tpbmRleCsxXSk7XG4gIH1cblxufVxuXG5cbiIsIlxuZXhwb3J0IHtEdXJhdGlvbiwgSG91ciwgU2Vjb25kLCBNaW51dGUsIE1pY3Jvc2Vjb25kLCBNaWxsaXNlY29uZH0gZnJvbSBcIi4vc3JjL2R1cmF0aW9uXCJcblxuXG4iLCJcblxuZXhwb3J0IHR5cGUgRHVyYXRpb24gPSBudW1iZXJcblxuZXhwb3J0IGNvbnN0IE1pY3Jvc2Vjb25kID0gMVxuZXhwb3J0IGNvbnN0IE1pbGxpc2Vjb25kID0gMTAwMCAqIE1pY3Jvc2Vjb25kXG5leHBvcnQgY29uc3QgU2Vjb25kID0gMTAwMCAqIE1pbGxpc2Vjb25kXG5leHBvcnQgY29uc3QgTWludXRlID0gNjAgKiBTZWNvbmRcbmV4cG9ydCBjb25zdCBIb3VyID0gNjAgKiBNaW51dGUiLCJpbXBvcnQge0Nsb3NlRXZlbnQsIE1lc3NhZ2VFdmVudCwgRXZlbnQsIFdlYlNvY2tldEludGVyZmFjZSwgRXJyb3JFdmVudH0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1iYXNlXCJcblxuXG5leHBvcnQgY2xhc3MgRG9tV2ViU29ja2V0IGltcGxlbWVudHMgV2ViU29ja2V0SW50ZXJmYWNle1xuXG4gIG9uY2xvc2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogQ2xvc2VFdmVudCkgPT4gYW55KSA9ICgpPT57fVxuICBvbmVycm9yOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IEVycm9yRXZlbnQpID0+IGFueSkgPSAoKT0+e31cbiAgb25tZXNzYWdlOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IE1lc3NhZ2VFdmVudCkgPT4gYW55KSA9ICgpPT57fVxuICBvbm9wZW46ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXZlbnQpID0+IGFueSkgPSAoKT0+e31cblxuICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0O1xuXG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybClcbiAgICB0aGlzLndlYnNvY2tldC5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy53ZWJzb2NrZXQub25jbG9zZSA9IChldjogQ2xvc2VFdmVudCk9PntcbiAgICAgIGNvbnNvbGUud2FybihcIkRvbVdlYlNvY2tldC0tLW9uY2xvc2VcIilcbiAgICAgIHRoaXMub25jbG9zZShldilcbiAgICB9XG4gICAgdGhpcy53ZWJzb2NrZXQub25lcnJvciA9IChldjogRXZlbnQpPT57XG4gICAgICBjb25zb2xlLmVycm9yKFwiRG9tV2ViU29ja2V0LS0tb25lcnJvclwiKVxuICAgICAgdGhpcy5vbmVycm9yKHtlcnJNc2c6IFwiRG9tV2ViU29ja2V0OiBvbmVycm9yLiBcIiArIGV2LnRvU3RyaW5nKCl9KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudCk9PntcbiAgICAgIHRoaXMub25tZXNzYWdlKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbm9wZW4gPSAoZXY6IEV2ZW50KT0+e1xuICAgICAgdGhpcy5vbm9wZW4oZXYpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKGNvZGU/OiBudW1iZXIsIHJlYXNvbj86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKGNvZGUsIHJlYXNvbilcbiAgfVxuXG4gIHNlbmQoZGF0YTogQXJyYXlCdWZmZXIpOiB2b2lkIHtcbiAgICB0aGlzLndlYnNvY2tldC5zZW5kKGRhdGEpXG4gIH1cblxufSIsIlxuZXhwb3J0IHtDbGllbnQsIFJlc3VsdH0gZnJvbSBcIi4vc3JjL2NsaWVudFwiXG5cbmV4cG9ydCB7VXRmOH0gZnJvbSBcIi4vc3JjL3V0ZjhcIlxuXG5leHBvcnQge0V2ZW50LCBFcnJvckV2ZW50LCBXZWJTb2NrZXRDb25zdHJ1Y3RvciwgV2ViU29ja2V0SW50ZXJmYWNlLCBDbG9zZUV2ZW50LCBDb25uZWN0aW9uLCBNZXNzYWdlRXZlbnR9IGZyb20gXCIuL3NyYy9jb25uZWN0aW9uXCJcblxuZXhwb3J0IHtPcHRpb24sIFJlcXVlc3RUaW1lb3V0LCBDb25uZWN0VGltZW91dCwgV2ViU29ja2V0fSBmcm9tIFwiLi9zcmMvb3B0aW9uXCJcblxuZXhwb3J0IHtDb25uRXJyb3J9IGZyb20gXCIuL3NyYy9jb25uZXJyb3JcIlxuIiwiXG5pbXBvcnQge1JlcXVlc3QsIFJlc3BvbnNlLCBTdGF0dXN9IGZyb20gXCIuL2Zha2VodHRwXCI7XG5pbXBvcnQge05ldH0gZnJvbSBcIi4vbmV0XCJcbmltcG9ydCB7b3B0aW9uLCBPcHRpb259IGZyb20gXCIuL29wdGlvblwiXG5pbXBvcnQge01pbGxpc2Vjb25kfSBmcm9tIFwidHMteHV0aWxzXCJcbmltcG9ydCB7Q2xvc2VFdmVudH0gZnJvbSBcIi4vY29ubmVjdGlvblwiXG5pbXBvcnQge0Nvbm5FcnJvcn0gZnJvbSBcIi4vY29ubmVycm9yXCJcbmltcG9ydCB7VXRmOH0gZnJvbSBcIi4vdXRmOFwiXG5cbmV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICBwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnV0ZjgudG9TdHJpbmcoKVxuICB9XG5cbiAgcHVibGljIHJhd0J1ZmZlcigpOlVpbnQ4QXJyYXkge1xuICAgIHJldHVybiB0aGlzLnV0ZjgucmF3XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0Zjg6VXRmOCkge1xuICB9XG59XG5cbmxldCBlbXB0eVJlc3VsdCA9IG5ldyBSZXN1bHQobmV3IFV0ZjgoXCJcIikpXG5cbmV4cG9ydCBjbGFzcyBDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IG5ldDogTmV0O1xuICBwcml2YXRlIGFsbFJlcTogTWFwPG51bWJlciwgKHJlc3VsdDoge3JlczogUmVzcG9uc2UsIGVycjogbnVsbH18e3JlczogbnVsbCwgZXJyOiBFcnJvcn0pID0+IHZvaWQ+O1xuICBwcml2YXRlIHJlcUlkOiBudW1iZXI7XG4gIC8vIHByaXZhdGUgb25QdXNoOiAocmVzOnN0cmluZyk9PlByb21pc2U8dm9pZD4gPSAocmVzOnN0cmluZyk9PntyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCl9O1xuICAvLyBwcml2YXRlIG9uUGVlckNsb3NlZDogKCk9PlByb21pc2U8dm9pZD4gPSAoKT0+e3JldHVybiBQcm9taXNlLnJlc29sdmUoKX07XG4gIHByaXZhdGUgb25QdXNoOiAocmVzOlJlc3VsdCk9PnZvaWQgPSAoKT0+e307XG4gIHByaXZhdGUgb25QZWVyQ2xvc2VkOiAoKT0+dm9pZCA9ICgpPT57fTtcbiAgcHJpdmF0ZSBvcCA9IG5ldyBvcHRpb25cblxuICAvLyB3cyBvciB3c3Mg5Y2P6K6u44CCXG4gIGNvbnN0cnVjdG9yKHdzczogc3RyaW5nLCAuLi5vcGY6IE9wdGlvbltdKSB7XG4gICAgaWYgKHdzcy5pbmRleE9mKFwiczovL1wiKSA9PT0gLTEpIHtcbiAgICAgIHdzcyA9IFwid3M6Ly9cIiArIHdzcztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBvIG9mIG9wZikge1xuICAgICAgbyh0aGlzLm9wKVxuICAgIH1cblxuICAgIHRoaXMubmV0ID0gbmV3IE5ldCh3c3MsIHRoaXMub3AuY29ubmVjdFRpbWVvdXQsIHRoaXMub3Aud2ViU29ja2V0Q29uc3RydWN0b3IsIHtcbiAgICAgIG9uTWVzc2FnZTogKHZhbHVlOiBBcnJheUJ1ZmZlcik6IHZvaWQgPT4ge1xuICAgICAgICBsZXQgcmVzID0gbmV3IFJlc3BvbnNlKHZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5pc1B1c2goKSkge1xuICAgICAgICAgIC8vIHB1c2ggYWNrIOW8uuWItuWGmee7mee9kee7nO+8jOS4jeiuoeWFpeW5tuWPkeaOp+WItlxuICAgICAgICAgIHRoaXMubmV0LldyaXRlRm9yY2UocmVzLm5ld1B1c2hBY2soKSlcbiAgICAgICAgICAvLyDlvILmraXmiafooYxcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLm9uUHVzaChuZXcgUmVzdWx0KG5ldyBVdGY4KHJlcy5kYXRhKCkpKSlcbiAgICAgICAgICB9LCAwKVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsYiA9IHRoaXMuYWxsUmVxLmdldChyZXMucmVxSUQoKSkgfHwgKCgpID0+IHt9KTtcbiAgICAgICAgdGhpcy5uZXQucmVjZWl2ZWRPbmVSZXNwb25zZSgpXG4gICAgICAgIGNsYih7cmVzOnJlcywgZXJyOm51bGx9KTtcbiAgICAgICAgdGhpcy5hbGxSZXEuZGVsZXRlKHJlcy5yZXFJRCgpKTtcblxuICAgICAgfSwgb25DbG9zZTogKHJlc3VsdDogQ2xvc2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmFsbFJlcS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHZhbHVlKHtyZXM6bnVsbCwgZXJyOiBuZXcgQ29ubkVycm9yKG5ldyBFcnJvcihcImNsb3NlZCBieSBwZWVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKX0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFsbFJlcS5jbGVhcigpXG5cbiAgICAgICAgLy8g5byC5q2l5omn6KGMXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICB0aGlzLm9uUGVlckNsb3NlZCgpXG4gICAgICAgIH0sIDApXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzdGFydCBmcm9tIDEwXG4gICAgdGhpcy5yZXFJZCA9IDEwO1xuICAgIHRoaXMuYWxsUmVxID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVdzcyh3c3M6IHN0cmluZykge1xuICAgIGlmICh3c3MuaW5kZXhPZihcInM6Ly9cIikgPT09IC0xKSB7XG4gICAgICB3c3MgPSBcIndzOi8vXCIgKyB3c3M7XG4gICAgfVxuICAgIHRoaXMubmV0LnVwZGF0ZVdzcyh3c3MpXG4gIH1cblxuICBwdWJsaWMgc2V0UHVzaENhbGxiYWNrKGNsYiA6KHJlczpSZXN1bHQpPT52b2lkKSB7XG4gICAgdGhpcy5vblB1c2ggPSBjbGI7XG4gIH1cblxuICBwdWJsaWMgc2V0UGVlckNsb3NlZENhbGxiYWNrKGNsYiA6KCk9PnZvaWQpIHtcbiAgICB0aGlzLm9uUGVlckNsb3NlZCA9IGNsYjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZW5kKGRhdGE6IEFycmF5QnVmZmVyIHwgc3RyaW5nLCBoZWFkZXI/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIDogUHJvbWlzZTxbUmVzdWx0LCBFcnJvciB8IG51bGxdPiB7XG5cbiAgICBsZXQgZXJyID0gYXdhaXQgdGhpcy5uZXQuQ29ubmVjdCgpO1xuICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtlbXB0eVJlc3VsdCwgbmV3IENvbm5FcnJvcihlcnIpXTtcbiAgICB9XG5cbiAgICBsZXQgcmVxID0gbmV3IFJlcXVlc3QoZGF0YSwgaGVhZGVyKTtcbiAgICBsZXQgcmVxSWQgPSB0aGlzLnJlcUlkKys7XG4gICAgcmVxLlNldFJlcUlkKHJlcUlkKTtcblxuICAgIGxldCB0aW1lcjpudW1iZXJ8dW5kZWZpbmVkXG4gICAgbGV0IHJlcyA9IG5ldyBQcm9taXNlPFtSZXN1bHQsIEVycm9yIHwgbnVsbF0+KFxuICAgICAgKHJlc29sdmU6IChyZXQ6IFtSZXN1bHQsIEVycm9yIHwgbnVsbCBdKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIHRoaXMuYWxsUmVxLnNldChyZXFJZCwgKHJlc3VsdCk9PntcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG5cbiAgICAgICAgICBpZiAocmVzdWx0LmVyciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzb2x2ZShbZW1wdHlSZXN1bHQsIHJlc3VsdC5lcnJdKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCByZXMgPSByZXN1bHQucmVzXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IFN0YXR1cy5Paykge1xuICAgICAgICAgICAgcmVzb2x2ZShbZW1wdHlSZXN1bHQsIG5ldyBFcnJvcihuZXcgVXRmOChyZXMuZGF0YSgpKS50b1N0cmluZygpKV0pO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZShbbmV3IFJlc3VsdChuZXcgVXRmOChyZXMuZGF0YSgpKSksIG51bGxdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgdGhpcy5hbGxSZXEuZGVsZXRlKHJlcUlkKVxuICAgICAgICAgIHJlc29sdmUoW2VtcHR5UmVzdWx0LCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpXSk7XG4gICAgICAgIH0sIHRoaXMub3AucmVxdWVzdFRpbWVvdXQvTWlsbGlzZWNvbmQpYXMgdW5rbm93biBhcyBudW1iZXI7XG4gICAgICB9KVxuXG4gICAgZXJyID0gYXdhaXQgdGhpcy5uZXQuV3JpdGUocmVxLlRvRGF0YSgpKTtcbiAgICAvLyDlkJHnvZHnu5zlhpnmlbDmja7lpLHotKXvvIzkuZ/lupTor6XlvZLkuLrov57mjqXlsYLnmoTplJnor69cbiAgICBpZiAoZXJyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYWxsUmVxLmRlbGV0ZShyZXFJZClcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHJldHVybiBbZW1wdHlSZXN1bHQsIG5ldyBDb25uRXJyb3IoZXJyKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlY292ZXIoKTogUHJvbWlzZTxFcnJvcnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMubmV0LkNvbm5lY3QoKTtcbiAgfVxufVxuXG4iLCJcbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnQge1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUV2ZW50IGV4dGVuZHMgRXZlbnR7XG4gIHJlYWRvbmx5IGRhdGE6IEFycmF5QnVmZmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvc2VFdmVudCBleHRlbmRzIEV2ZW50e1xuICByZWFkb25seSBjb2RlOiBudW1iZXI7XG4gIHJlYWRvbmx5IHJlYXNvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgZXJyTXNnOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWJTb2NrZXRJbnRlcmZhY2Uge1xuICBvbmNsb3NlOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IENsb3NlRXZlbnQpID0+IGFueSk7XG4gIG9uZXJyb3I6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXJyb3JFdmVudCkgPT4gYW55KTtcbiAgb25tZXNzYWdlOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IE1lc3NhZ2VFdmVudCkgPT4gYW55KTtcbiAgb25vcGVuOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IEV2ZW50KSA9PiBhbnkpO1xuXG4gIGNsb3NlKGNvZGU/OiBudW1iZXIsIHJlYXNvbj86IHN0cmluZyk6IHZvaWQ7XG4gIHNlbmQoZGF0YTogQXJyYXlCdWZmZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlNvY2tldENvbnN0cnVjdG9yIHtcbiAgbmV3ICh1cmw6IHN0cmluZyk6IFdlYlNvY2tldEludGVyZmFjZVxufVxuXG5leHBvcnQgY2xhc3MgRHVtbXlXcyBpbXBsZW1lbnRzIFdlYlNvY2tldEludGVyZmFjZXtcbiAgb25jbG9zZSA9ICgpPT57fVxuICBvbmVycm9yID0gKCk9Pnt9XG4gIG9ubWVzc2FnZSA9ICgpPT57fVxuICBvbm9wZW4gPSAoKT0+e31cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgfVxuXG4gIHNlbmQoKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm90IHNldCBXZWJTb2NrZXRDb25zdHJ1Y3RvclwiKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIHtcblxuICBwcml2YXRlIG1heENvbmN1cnJlbnQgOiBudW1iZXIgPSA1O1xuICBwcml2YXRlIG1heEJ5dGVzOiBudW1iZXIgPSA0ICogMTAyNCAqIDEwMjQ7XG4gIHByaXZhdGUgY29ubmVjdElEOiBzdHJpbmcgPSBcIlwiO1xuXG4gIHB1YmxpYyBvbmNsb3NlOiAoKGV2OiBDbG9zZUV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuICBwdWJsaWMgb25lcnJvcjogKChldjogRXJyb3JFdmVudCkgPT4gYW55KSA9ICgpPT57fTtcbiAgcHVibGljIG9ubWVzc2FnZTogKChldjogTWVzc2FnZUV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuICBwdWJsaWMgb25vcGVuOiAoKGV2OiBFdmVudCkgPT4gYW55KSA9ICgpPT57fTtcblxuICBwcml2YXRlIHdhaXRpbmdTZW5kID0gbmV3IEFycmF5PEFycmF5QnVmZmVyPigpXG4gIHByaXZhdGUgY29uY3VycmVudCA9IDBcblxuICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0SW50ZXJmYWNlO1xuXG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCB3ZWJzb2NrZXRDb25zdHJ1Y3RvcjogV2ViU29ja2V0Q29uc3RydWN0b3IpIHtcbiAgICB0aGlzLndlYnNvY2tldCA9IG5ldyB3ZWJzb2NrZXRDb25zdHJ1Y3Rvcih1cmwpXG5cbiAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKGV2OiBDbG9zZUV2ZW50KT0+e1xuICAgICAgdGhpcy5vbmNsb3NlKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KT0+e1xuICAgICAgdGhpcy5vbmVycm9yKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAocmVzdWx0OiBNZXNzYWdlRXZlbnQpPT57XG4gICAgICBsZXQgZXJyID0gdGhpcy5yZWFkSGFuZHNoYWtlKHJlc3VsdClcbiAgICAgIGlmIChlcnIgIT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgdGhpcy53ZWJzb2NrZXQub25jbG9zZSA9ICgpPT57fVxuICAgICAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKCk9Pnt9XG4gICAgICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9ICgpPT57fVxuICAgICAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAoKT0+e31cblxuICAgICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uZXJyb3Ioe2Vyck1zZzogZXJyLm1lc3NhZ2V9KVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyDorr7nva7kuLrnnJ/mraPnmoTmjqXmlLblh73mlbBcbiAgICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMub25tZXNzYWdlXG5cbiAgICAgIC8vIOaPoeaJi+e7k+adn+aJjeaYr+ecn+ato+eahG9ub3BlblxuICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9IChfOiBFdmVudCk9PntcbiAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICB9XG4gIH1cblxuICAvKlxuICAgIEhlYXJ0QmVhdF9zIHwgRnJhbWVUaW1lb3V0X3MgfCBNYXhDb25jdXJyZW50IHwgTWF4Qnl0ZXMgfCBjb25uZWN0IGlkXG4gICAgSGVhcnRCZWF0X3M6IDIgYnl0ZXMsIG5ldCBvcmRlclxuICAgIEZyYW1lVGltZW91dF9zOiAxIGJ5dGUgID09PTBcbiAgICBNYXhDb25jdXJyZW50OiAxIGJ5dGVcbiAgICBNYXhCeXRlczogNCBieXRlcywgbmV0IG9yZGVyXG4gICAgY29ubmVjdCBpZDogOCBieXRlcywgbmV0IG9yZGVyXG4qL1xuICBwcml2YXRlIHJlYWRIYW5kc2hha2UocmVzdWx0OiBNZXNzYWdlRXZlbnQpOiBFcnJvciB8IG51bGwge1xuICAgIGxldCBidWZmZXIgPSByZXN1bHQuZGF0YVxuICAgIGlmIChidWZmZXIuYnl0ZUxlbmd0aCAhPSAxNikge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcImxlbihoYW5kc2hha2UpICE9IDE2XCIpXG4gICAgfVxuXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcblxuICAgIHRoaXMubWF4Q29uY3VycmVudCA9IHZpZXcuZ2V0VWludDgoMyk7XG4gICAgdGhpcy5tYXhCeXRlcyA9IHZpZXcuZ2V0VWludDMyKDQpO1xuICAgIHRoaXMuY29ubmVjdElEID0gKFwiMDAwMDAwMDBcIiArIHZpZXcuZ2V0VWludDMyKDgpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTgpICtcbiAgICAgIChcIjAwMDAwMDAwXCIgKyB2aWV3LmdldFVpbnQzMigxMikudG9TdHJpbmcoMTYpKS5zbGljZSgtOCk7XG4gICAgY29uc29sZS5sb2coXCJjb25uZWN0SUQgPSBcIiwgdGhpcy5jb25uZWN0SUQpXG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcHVibGljIHJlY2VpdmVkT25lUmVzcG9uc2UoKTp2b2lkIHtcbiAgICB0aGlzLmNvbmN1cnJlbnQtLVxuICAgIC8vIOmYsuW+oeaAp+S7o+eggVxuICAgIGlmICh0aGlzLmNvbmN1cnJlbnQgPCAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJjb25uZWN0aW9uLmNvbmN1cnJlbnQgPCAwXCIpXG4gICAgICB0aGlzLmNvbmN1cnJlbnQgPSAwXG4gICAgfVxuXG4gICAgdGhpcy5fc2VuZCgpXG4gIH1cblxuICBwcml2YXRlIF9zZW5kKCk6dm9pZCB7XG4gICAgaWYgKHRoaXMuY29uY3VycmVudCA+IHRoaXMubWF4Q29uY3VycmVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2FpdGluZ1NlbmQubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuY29uY3VycmVudCsrXG5cbiAgICB0aGlzLndlYnNvY2tldC5zZW5kKHRoaXMud2FpdGluZ1NlbmQuc2hpZnQoKSEpXG4gIH1cblxuICBwdWJsaWMgc2VuZChkYXRhOiBBcnJheUJ1ZmZlcik6IEVycm9yIHwgbnVsbCB7XG4gICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCA+IHRoaXMubWF4Qnl0ZXMpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJkYXRhIGlzIHRvbyBsYXJnZSEgTXVzdCBiZSBsZXNzIHRoYW4gXCIgKyB0aGlzLm1heEJ5dGVzLnRvU3RyaW5nKCkgKyBcIi4gXCIpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0aW5nU2VuZC5wdXNoKGRhdGEpXG4gICAgdGhpcy5fc2VuZCgpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHB1YmxpYyBTZW5kRm9yY2UoZGF0YTogQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLndlYnNvY2tldC5zZW5kKGRhdGEpXG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy53ZWJzb2NrZXQuY2xvc2UoKVxuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIENvbm5FcnJvciBpbXBsZW1lbnRzIEVycm9ye1xuICBtZXNzYWdlOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIHN0YWNrPzogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IoZXJyb3I6IEVycm9yKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZXJyb3IubWVzc2FnZVxuICAgIHRoaXMubmFtZSA9IGVycm9yLm5hbWVcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxufSIsIlxuLyoqXG5cbiBjb250ZW50IHByb3RvY29sOlxuICAgcmVxdWVzdCAtLS1cbiAgICAgcmVxaWQgfCBoZWFkZXJzIHwgaGVhZGVyLWVuZC1mbGFnIHwgZGF0YVxuICAgICByZXFpZDogNCBieXRlcywgbmV0IG9yZGVyO1xuICAgICBoZWFkZXJzOiA8IGtleS1sZW4gfCBrZXkgfCB2YWx1ZS1sZW4gfCB2YWx1ZSA+IC4uLiA7ICBbb3B0aW9uYWxdXG4gICAgIGtleS1sZW46IDEgYnl0ZSwgIGtleS1sZW4gPSBzaXplb2Yoa2V5KTtcbiAgICAgdmFsdWUtbGVuOiAxIGJ5dGUsIHZhbHVlLWxlbiA9IHNpemVvZih2YWx1ZSk7XG4gICAgIGhlYWRlci1lbmQtZmxhZzogMSBieXRlLCA9PT0gMDtcbiAgICAgZGF0YTogICAgICAgW29wdGlvbmFsXVxuXG4gICAgICByZXFpZCA9IDE6IGNsaWVudCBwdXNoIGFjayB0byBzZXJ2ZXIuXG4gICAgICAgICAgICBhY2s6IG5vIGhlYWRlcnM7XG4gICAgICAgICAgICBkYXRhOiBwdXNoSWQuIDQgYnl0ZXMsIG5ldCBvcmRlcjtcblxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgcmVzcG9uc2UgLS0tXG4gICAgIHJlcWlkIHwgc3RhdHVzIHwgZGF0YVxuICAgICByZXFpZDogNCBieXRlcywgbmV0IG9yZGVyO1xuICAgICBzdGF0dXM6IDEgYnl0ZSwgMC0tLXN1Y2Nlc3MsIDEtLS1mYWlsZWRcbiAgICAgZGF0YTogaWYgc3RhdHVzPT1zdWNjZXNzLCBkYXRhPTxhcHAgZGF0YT4gICAgW29wdGlvbmFsXVxuICAgICBpZiBzdGF0dXM9PWZhaWxlZCwgZGF0YT08ZXJyb3IgcmVhc29uPlxuXG5cbiAgICByZXFpZCA9IDE6IHNlcnZlciBwdXNoIHRvIGNsaWVudFxuICAgICAgICBzdGF0dXM6IDBcbiAgICAgICAgICBkYXRhOiBmaXJzdCA0IGJ5dGVzIC0tLSBwdXNoSWQsIG5ldCBvcmRlcjtcbiAgICAgICAgICAgICAgICBsYXN0IC0tLSByZWFsIGRhdGFcblxuICovXG5cbmltcG9ydCB7VXRmOH0gZnJvbSBcIi4vdXRmOFwiO1xuXG5leHBvcnQgY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgYnVmZmVyOiBBcnJheUJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihkYXRhOkFycmF5QnVmZmVyfHN0cmluZywgaGVhZGVyPzpNYXA8c3RyaW5nLHN0cmluZz4pIHtcbiAgICBsZXQgbGVuID0gNDtcbiAgICBoZWFkZXIgPSBoZWFkZXIgfHwgbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgIGxldCBoZWFkZXJBcnIgPSBuZXcgQXJyYXk8e2tleTpVdGY4LCB2YWx1ZTpVdGY4fT4oKTtcblxuICAgIGhlYWRlci5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZywgXzogTWFwPHN0cmluZywgc3RyaW5nPik9PntcbiAgICAgIGxldCB1dGY4ID0ge2tleTogbmV3IFV0Zjgoa2V5KSwgdmFsdWU6IG5ldyBVdGY4KHZhbHVlKX07XG4gICAgICBoZWFkZXJBcnIucHVzaCh1dGY4KTtcbiAgICAgIGxlbiArPSAxICsgdXRmOC5rZXkuYnl0ZUxlbmd0aCArIDEgKyB1dGY4LnZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgfSk7XG5cbiAgICBsZXQgYm9keSA9IG5ldyBVdGY4KGRhdGEpO1xuXG4gICAgbGVuICs9IDEgKyBib2R5LmJ5dGVMZW5ndGg7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihsZW4pO1xuXG4gICAgbGV0IHBvcyA9IDQ7XG4gICAgZm9yIChsZXQgaCBvZiBoZWFkZXJBcnIpIHtcbiAgICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50OChwb3MsIGgua2V5LmJ5dGVMZW5ndGgpO1xuICAgICAgcG9zKys7XG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIpKS5zZXQoaC5rZXkucmF3LCBwb3MpO1xuICAgICAgcG9zICs9IGgua2V5LmJ5dGVMZW5ndGg7XG4gICAgICAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKSkuc2V0VWludDgocG9zLCBoLnZhbHVlLmJ5dGVMZW5ndGgpO1xuICAgICAgcG9zKys7XG4gICAgICAobmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIpKS5zZXQoaC52YWx1ZS5yYXcsIHBvcyk7XG4gICAgICBwb3MgKz0gaC52YWx1ZS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKSkuc2V0VWludDgocG9zLCAwKTtcbiAgICBwb3MrKztcblxuICAgIChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLnNldChib2R5LnJhdywgcG9zKTtcbiAgfVxuXG4gIHB1YmxpYyBTZXRSZXFJZChpZDpudW1iZXIpIHtcbiAgICAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyKSkuc2V0VWludDMyKDAsIGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBUb0RhdGEoKTpBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyXG4gIH1cblxufVxuXG5leHBvcnQgZW51bSBTdGF0dXMge1xuICBPayxcbiAgRmFpbGVkXG59XG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zZSB7XG5cbiAgcHVibGljIHJlYWRvbmx5IHN0YXR1czogU3RhdHVzO1xuICBwcml2YXRlIHJlYWRvbmx5IGJ1ZmZlcjogVWludDhBcnJheTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgIHRoaXMuc3RhdHVzID0gdGhpcy5idWZmZXJbNF0gPT0gMD9TdGF0dXMuT2sgOiBTdGF0dXMuRmFpbGVkO1xuICB9XG5cbiAgcHVibGljIHJlcUlEKCk6bnVtYmVyIHtcbiAgICByZXR1cm4gKG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlci5idWZmZXIpKS5nZXRVaW50MzIoMCk7XG4gIH1cblxuICBwdWJsaWMgZGF0YSgpOkFycmF5QnVmZmVyIHtcblxuICAgIGxldCBvZmZzZXQgPSA1XG4gICAgaWYgKHRoaXMuaXNQdXNoKCkpIHtcbiAgICAgIC8vIHB1c2hJZFxuICAgICAgb2Zmc2V0ICs9IDRcbiAgICB9XG5cbiAgICBpZiAodGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA8PSBvZmZzZXQpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5idWZmZXIuc2xpY2Uob2Zmc2V0KS5idWZmZXJcbiAgICAvLyBsZXQgdXRmOCA9IG5ldyBVdGY4KHRoaXMuYnVmZmVyLnNsaWNlKG9mZnNldCkpO1xuICAgIC8vIHJldHVybiB1dGY4LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgaXNQdXNoKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVxSUQoKSA9PT0gMTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdQdXNoQWNrKCk6IEFycmF5QnVmZmVyIHtcbiAgICBpZiAoIXRoaXMuaXNQdXNoKCkgfHwgdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCA8PSA0KzErNCkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIH1cblxuICAgIGxldCByZXQgPSBuZXcgQXJyYXlCdWZmZXIoNCArIDEgKyA0KVxuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KHJldClcbiAgICB2aWV3LnNldFVpbnQzMigwLCAxKVxuICAgIHZpZXcuc2V0VWludDgoNCwgMClcbiAgICB2aWV3LnNldFVpbnQzMig1LCAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLmJ1ZmZlcikpLmdldFVpbnQzMig1KSlcblxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUVycm9yKHJlcUlkOm51bWJlciwgZXJyOiBFcnJvcik6UmVzcG9uc2Uge1xuICAgIGxldCB1dGY4ID0gbmV3IFV0ZjgoZXJyLm1lc3NhZ2UpO1xuICAgIGxldCBidWZmZXIgPSBuZXcgVWludDhBcnJheSg0KzEgKyB1dGY4LmJ5dGVMZW5ndGgpO1xuICAgIChuZXcgRGF0YVZpZXcoYnVmZmVyLmJ1ZmZlcikpLnNldFVpbnQzMigwLCByZXFJZCk7XG4gICAgYnVmZmVyWzRdID0gMTtcbiAgICBidWZmZXIuc2V0KHV0ZjgucmF3LCA1KTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoYnVmZmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEdXJhdGlvbiwgTWlsbGlzZWNvbmR9IGZyb20gXCJ0cy14dXRpbHNcIlxuaW1wb3J0IHtDb25uZWN0aW9uLCBNZXNzYWdlRXZlbnQsIENsb3NlRXZlbnQsIEVycm9yRXZlbnQsIFdlYlNvY2tldENvbnN0cnVjdG9yfSBmcm9tIFwiLi9jb25uZWN0aW9uXCJcblxuXG5pbnRlcmZhY2UgTmV0SGFuZGxlIHtcbiAgb25NZXNzYWdlKHZhbHVlOiBBcnJheUJ1ZmZlcik6IHZvaWQ7XG5cbiAgb25DbG9zZShyZXN1bHQ6IENsb3NlRXZlbnQpOiB2b2lkXG5cbiAgb25FcnJvcj86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIE5ldCB7XG5cbiAgcHJpdmF0ZSBjb25uOiBDb25uZWN0aW9uIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgd2FpdGluZ0Nvbm5lY3Q6IEFycmF5PChyZXQ6IEVycm9yIHwgbnVsbCkgPT4gdm9pZD4gPSBuZXcgQXJyYXk8KHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd3NzOiBzdHJpbmcsIHByaXZhdGUgY29ubmVjdFRpbWVvdXQ6IER1cmF0aW9uXG4gICAgICAgICAgICAgICwgcHJpdmF0ZSB3ZWJTb2NrZXRDb25zdHJ1Y3RvcjogV2ViU29ja2V0Q29uc3RydWN0b3JcbiAgICAgICAgICAgICAgLCBwcml2YXRlIGhhbmRsZTogTmV0SGFuZGxlKSB7XG4gIH1cblxuICBwcml2YXRlIGRvV2FpdGluZ0Nvbm5lY3QoZXJyOiBFcnJvciB8IG51bGwpIHtcbiAgICBmb3IgKGxldCB3YWl0aW5nIG9mIHRoaXMud2FpdGluZ0Nvbm5lY3QpIHtcbiAgICAgIHdhaXRpbmcoZXJyKVxuICAgIH1cbiAgICB0aGlzLndhaXRpbmdDb25uZWN0ID0gbmV3IEFycmF5PChyZXQ6IEVycm9yIHwgbnVsbCkgPT4gdm9pZD4oKTtcbiAgfVxuXG4gIHByaXZhdGUgaW52YWxpZFdlYnNvY2tldCgpIHtcbiAgICB0aGlzLmNvbm4hLm9ubWVzc2FnZSA9ICgpID0+IHt9XG4gICAgdGhpcy5jb25uIS5vbm9wZW4gPSAoKSA9PiB7fVxuICAgIHRoaXMuY29ubiEub25jbG9zZSA9ICgpID0+IHt9XG4gICAgdGhpcy5jb25uIS5vbmVycm9yID0gKCkgPT4ge31cbiAgICB0aGlzLmNvbm4gPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVdzcyh3c3M6IHN0cmluZykge1xuICAgIHRoaXMud3NzID0gd3NzXG4gIH1cblxuICAvLyDph4fnlKjmnIDlpJrlj6rmnInkuIDmnaHov57mjqXlpITkuo7mtLvot4PnirbmgIHnmoTnrZbnlaXvvIjljIXmi6zvvJpjb25uZWN0aW5nL2Nvbm5lY3QvY2xvc2luZynvvIzov57mjqXnmoTliKTor7vlj6/ku6XljZXkuIDljJbvvIzlr7nkuIrlsYLmmrTpnLLnmoTosIPnlKjlj6/ku6XnroDljZXljJbjgIJcbiAgLy8g5L2G5a+55LiA5Lqb5p6B6ZmQ5pON5L2c5Y+v6IO95YW35pyJ5rue5ZCO5oCn77yM5q+U5aaC5q2j5aSE5LqOY2xvc2luZ+eahOaXtuWAmSjku6PnoIHlvILmraXmiafooYzkuK0p77yM5paw55qEQ29ubmVjdOiwg+eUqOS4jeiDveeri+WNs+i/nuaOpeOAguS4uuS6huWwveWPr+iDveeahOmBv+WFjei/meenjeaDheWGte+8jFxuICAvLyDlnKhvbmVycm9yIOWPiiBvbmNsb3NlIOS4remDveS9v+eUqOS6huWQjOatpeS7o+eggeOAglxuICAvLyDlkI7mnJ/lpoLmnpzph4fnlKjlpJrmnaHmtLvot4PnirbmgIHnmoTnrZbnlaUo5q+U5aaC77ya5LiA5p2hY2xvc2luZ++8jOS4gOadoWNvbm5lY3Rpbmcp77yM6ZyA6KaB6ICD6JmRbmV0LmhhbmRsZeeahOWumuS5ieWPiuW8guatpeaDheWGteeahOaXtuW6j+mXrumimOOAglxuICBwdWJsaWMgYXN5bmMgQ29ubmVjdCgpOiBQcm9taXNlPEVycm9yIHwgbnVsbD4ge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8RXJyb3IgfCBudWxsPigocmVzb2x2ZTogKHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkKSA9PiB7XG4gICAgICB0aGlzLndhaXRpbmdDb25uZWN0LnB1c2gocmVzb2x2ZSk7XG4gICAgICBpZiAodGhpcy5jb25uICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgLy8gaW52YWxpZCB0aGlzLndlYnNvY2tldFxuICAgICAgICB0aGlzLmludmFsaWRXZWJzb2NrZXQoKVxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZG9XYWl0aW5nQ29ubmVjdChuZXcgRXJyb3IoXCJjb25uZWN0IHRpbWVvdXRcIikpXG4gICAgICB9LCB0aGlzLmNvbm5lY3RUaW1lb3V0L01pbGxpc2Vjb25kKVxuXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmNvbm4gPSBuZXcgQ29ubmVjdGlvbih0aGlzLndzcywgdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvcik7XG4gICAgICB9Y2F0Y2ggKGUpIHtcbiAgICAgICAgLy8g55uu5YmN6KeC5rWL5Yiw77yaMeOAgeWmguaenHVybOWGmemUme+8jOWImeaYr+ebtOaOpeWcqG5ld+WwseS8muaKm+WHuuW8guW4uO+8mzLjgIHlpoLmnpzmmK/nnJ/mraPnmoTov57mjqXlpLHotKXvvIzliJnkvJrop6blj5FvbmVycm9y77yM5ZCM5pe26L+Y5Lya6Kem5Y+Rb25jbG9zZVxuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG5ldyBFcnJvcihlIGFzIHN0cmluZykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gKHJlc3VsdDogTWVzc2FnZUV2ZW50KT0+e1xuICAgICAgICB0aGlzLmhhbmRsZS5vbk1lc3NhZ2UocmVzdWx0LmRhdGEpXG4gICAgICB9O1xuICAgICAgdGhpcy5jb25uLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRoaXMuZG9XYWl0aW5nQ29ubmVjdChudWxsKTtcbiAgICAgIH07XG4gICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IChyZXN1bHQ6IENsb3NlRXZlbnQpID0+IHtcbiAgICAgICAgLy8g5q2k5aSE5Y+q6ICD6JmR6L+Y5aSE5LqO6L+e5o6l55qE5oOF5Ya177yM5YW25LuW5oOF5Ya15Y+v5Lul5Y+C6KeBIG9uZXJyb3LnmoTlpITnkIZcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsb3NlRXZlbnQgPSB7Y29kZTpyZXN1bHQuY29kZSwgcmVhc29uOiByZXN1bHQucmVhc29ufVxuICAgICAgICBpZiAoY2xvc2VFdmVudC5yZWFzb24gPT09IFwiXCIgfHwgY2xvc2VFdmVudC5yZWFzb24gPT09IHVuZGVmaW5lZCB8fCBjbG9zZUV2ZW50LnJlYXNvbiA9PT0gbnVsbCkge1xuICAgICAgICAgIGNsb3NlRXZlbnQucmVhc29uID0gXCJ1bmtub3duXCJcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oXCJuZXQtLS1vbkNsb3NlZCwgXCIsIEpTT04uc3RyaW5naWZ5KGNsb3NlRXZlbnQpKTtcbiAgICAgICAgdGhpcy5oYW5kbGUub25DbG9zZShjbG9zZUV2ZW50KTtcbiAgICAgICAgdGhpcy5jb25uPy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5jb25uLm9uZXJyb3IgPSAocmVzdWx0OiBFcnJvckV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuZXQtLS1vbkVycm9yXCIsIHJlc3VsdCk7XG4gICAgICAgIC8vIOmcgOimgeiAg+iZkei/nuaOpeWksei0peeahOmYsuW+oeaAp+S7o+egge+8jHdlYnNvY2tldOaOpeWPo+ayoeacieaYjuehruaMh+WHuui/nuaOpeWksei0peeUseWTquS4quaOpeWPo+i/lOWbnu+8jOaVhei/memHjOWKoOS4iui/nuaOpeWksei0peeahOWkhOeQhlxuICAgICAgICAvLyDnm67liY3op4LmtYvliLDvvJox44CB5aaC5p6cdXJs5YaZ6ZSZ77yM5YiZ5piv55u05o6l5ZyobmV35bCx5Lya5oqb5Ye65byC5bi477ybMuOAgeWmguaenOaYr+ecn+ato+eahOi/nuaOpeWksei0pe+8jOWImeS8muinpuWPkW9uZXJyb3LvvIzlkIzml7bov5jkvJrop6blj5FvbmNsb3NlXG5cbiAgICAgICAgLy8g5rKh5pyJ5byA5aeL6L+e5o6l5oiW6ICF5YW25LuW5Lu75L2V5oOF5Ya16YCg5oiQdGhpcy5jb25u6KKr572u5Li656m677yM6YO955u05o6l6L+U5ZueXG4gICAgICAgIGlmICh0aGlzLmNvbm4gPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWTjeW6lOS6hm9uZXJyb3Ig5bCx5LiN5YaN5ZON5bqUb25jbG9zZVxuICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9ICgpPT57fVxuXG4gICAgICAgIC8vIOebruWJjeWBmuWmguS4i+eahOiuvuWumu+8muS4gOS4quS4iuWxgueahHBlbmRpbmfosIPnlKgo6L+e5o6l5oiW6ICF6K+35rGC562JKe+8jOimgeS5iOaYr+WcqOetieW+hei/nuaOpeS4rVxuICAgICAgICAvLyDopoHkuYjmmK/lnKjnrYnlvoVyZXNwb25zZeS4reOAguWNs+S9v+WHuueOsOW8guW4uO+8jOS4iuWxguS4gOiIrOWPr+iDvemDveaciei2heaXtu+8jOS7jeS4jeS8muS4gOebtOiiq3BlbmRpbmdcbiAgICAgICAgLy8gdG9kbzog5piv5ZCm5Lya5pyJ5ZCM5pe25Ye6546w5ZyoIOetiei/nuaOpSDkuI4g562J5ZON5bqUIOS4re+8n1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRoaXMuZG9XYWl0aW5nQ29ubmVjdChuZXcgRXJyb3IocmVzdWx0LmVyck1zZykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFuZGxlLm9uQ2xvc2Uoe2NvZGU6IC0xLCByZWFzb246IFwib25lcnJvcjogXCIgKyByZXN1bHQuZXJyTXNnfSk7XG4gICAgICAgICAgaWYgKHRoaXMuaGFuZGxlLm9uRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlLm9uRXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbm4/LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgV3JpdGUoZGF0YTogQXJyYXlCdWZmZXIpOiBFcnJvciB8IG51bGwge1xuICAgIGlmICh0aGlzLmNvbm4gPT0gbnVsbCB8fCAhdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJub3QgY29ubmVjdGVkXCIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29ubi5zZW5kKGRhdGEpXG4gIH1cblxuICBwdWJsaWMgV3JpdGVGb3JjZShkYXRhOiBBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuY29ubj8uU2VuZEZvcmNlKGRhdGEpXG4gIH1cblxuICBwdWJsaWMgcmVjZWl2ZWRPbmVSZXNwb25zZSgpOnZvaWQge1xuICAgIHRoaXMuY29ubj8ucmVjZWl2ZWRPbmVSZXNwb25zZSgpXG4gIH1cblxufSIsImltcG9ydCB7RHVyYXRpb24sIFNlY29uZH0gZnJvbSBcInRzLXh1dGlsc1wiXG5pbXBvcnQge0R1bW15V3MsIFdlYlNvY2tldENvbnN0cnVjdG9yfSBmcm9tIFwiLi9jb25uZWN0aW9uXCJcblxuZXhwb3J0IGNsYXNzIG9wdGlvbiB7XG4gIHJlcXVlc3RUaW1lb3V0OiBEdXJhdGlvbiA9IDMwKlNlY29uZFxuICBjb25uZWN0VGltZW91dDogRHVyYXRpb24gPSAzMCpTZWNvbmRcbiAgd2ViU29ja2V0Q29uc3RydWN0b3I6IFdlYlNvY2tldENvbnN0cnVjdG9yID0gRHVtbXlXc1xufVxuXG5leHBvcnQgdHlwZSBPcHRpb24gPSAob3AgOm9wdGlvbik9PnZvaWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXF1ZXN0VGltZW91dChkIDogRHVyYXRpb24pOiBPcHRpb24ge1xuICByZXR1cm4gKG9wIDpvcHRpb24pID0+IHtcbiAgICBvcC5yZXF1ZXN0VGltZW91dCA9IGRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29ubmVjdFRpbWVvdXQoZCA6RHVyYXRpb24pOiBPcHRpb24ge1xuICByZXR1cm4gKG9wIDpvcHRpb24pID0+IHtcbiAgICBvcC5jb25uZWN0VGltZW91dCA9IGRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gV2ViU29ja2V0KHdlYlNvY2tldENvbnN0cnVjdG9yOiBXZWJTb2NrZXRDb25zdHJ1Y3Rvcik6IE9wdGlvbiB7XG4gIHJldHVybiAob3AgOm9wdGlvbikgPT4ge1xuICAgIG9wLndlYlNvY2tldENvbnN0cnVjdG9yID0gd2ViU29ja2V0Q29uc3RydWN0b3JcbiAgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgVXRmOCB7XG4gIHB1YmxpYyByZWFkb25seSByYXc6IFVpbnQ4QXJyYXk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5kZXhlczogQXJyYXk8bnVtYmVyPjtcbiAgcHJpdmF0ZSBzdHI6c3RyaW5nfG51bGw7XG4gIHB1YmxpYyByZWFkb25seSBieXRlTGVuZ3RoOm51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGxlbmd0aDpudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoaW5wdXQ6IEFycmF5QnVmZmVyfHN0cmluZykge1xuICAgIHRoaXMuaW5kZXhlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnJhdyA9IG5ldyBVaW50OEFycmF5KGlucHV0KTtcbiAgICAgIGxldCB1dGY4aSA9IDA7XG4gICAgICB3aGlsZSAodXRmOGkgPCB0aGlzLnJhdy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzLnB1c2godXRmOGkpO1xuICAgICAgICB1dGY4aSArPSBVdGY4LmdldFVURjhDaGFyTGVuZ3RoKFV0ZjgubG9hZFVURjhDaGFyQ29kZSh0aGlzLnJhdywgdXRmOGkpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKHV0ZjhpKTsgIC8vIGVuZCBmbGFnXG5cbiAgICAgIHRoaXMuc3RyID0gbnVsbDtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0ciA9IGlucHV0O1xuXG4gICAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICAgIGZvciAobGV0IGNoIG9mIGlucHV0KSB7XG4gICAgICAgIGxlbmd0aCArPSBVdGY4LmdldFVURjhDaGFyTGVuZ3RoKGNoLmNvZGVQb2ludEF0KDApISlcbiAgICAgIH1cbiAgICAgIHRoaXMucmF3ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcblxuICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgIGZvciAobGV0IGNoIG9mIGlucHV0KSB7XG4gICAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgaW5kZXggPSBVdGY4LnB1dFVURjhDaGFyQ29kZSh0aGlzLnJhdywgY2guY29kZVBvaW50QXQoMCkhLCBpbmRleClcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5kZXhlcy5wdXNoKGluZGV4KTsgLy8gZW5kIGZsYWdcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuaW5kZXhlcy5sZW5ndGggLSAxO1xuICAgIHRoaXMuYnl0ZUxlbmd0aCA9IHRoaXMucmF3LmJ5dGVMZW5ndGg7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGxvYWRVVEY4Q2hhckNvZGUoYUNoYXJzOiBVaW50OEFycmF5LCBuSWR4OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgbGV0IG5MZW4gPSBhQ2hhcnMubGVuZ3RoLCBuUGFydCA9IGFDaGFyc1tuSWR4XTtcblxuICAgIHJldHVybiBuUGFydCA+IDI1MSAmJiBuUGFydCA8IDI1NCAmJiBuSWR4ICsgNSA8IG5MZW4gP1xuICAgICAgLyogKG5QYXJ0IC0gMjUyIDw8IDMwKSBtYXkgYmUgbm90IHNhZmUgaW4gRUNNQVNjcmlwdCEgU28uLi46ICovXG4gICAgICAvKiBzaXggYnl0ZXMgKi8gKG5QYXJ0IC0gMjUyKSAqIDEwNzM3NDE4MjQgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAyNClcbiAgICAgICsgKGFDaGFyc1tuSWR4ICsgMl0gLSAxMjggPDwgMTgpICsgKGFDaGFyc1tuSWR4ICsgM10gLSAxMjggPDwgMTIpXG4gICAgICArIChhQ2hhcnNbbklkeCArIDRdIC0gMTI4IDw8IDYpICsgYUNoYXJzW25JZHggKyA1XSAtIDEyOFxuICAgICAgOiBuUGFydCA+IDI0NyAmJiBuUGFydCA8IDI1MiAmJiBuSWR4ICsgNCA8IG5MZW4gP1xuICAgICAgICAvKiBmaXZlIGJ5dGVzICovIChuUGFydCAtIDI0OCA8PCAyNCkgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAxOClcbiAgICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCAxMikgKyAoYUNoYXJzW25JZHggKyAzXSAtIDEyOCA8PCA2KVxuICAgICAgICArIGFDaGFyc1tuSWR4ICsgNF0gLSAxMjhcbiAgICAgICAgOiBuUGFydCA+IDIzOSAmJiBuUGFydCA8IDI0OCAmJiBuSWR4ICsgMyA8IG5MZW4gP1xuICAgICAgICAgIC8qIGZvdXIgYnl0ZXMgKi8oblBhcnQgLSAyNDAgPDwgMTgpICsgKGFDaGFyc1tuSWR4ICsgMV0gLSAxMjggPDwgMTIpXG4gICAgICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCA2KSArIGFDaGFyc1tuSWR4ICsgM10gLSAxMjhcbiAgICAgICAgICA6IG5QYXJ0ID4gMjIzICYmIG5QYXJ0IDwgMjQwICYmIG5JZHggKyAyIDwgbkxlbiA/XG4gICAgICAgICAgICAvKiB0aHJlZSBieXRlcyAqLyAoblBhcnQgLSAyMjQgPDwgMTIpICsgKGFDaGFyc1tuSWR4ICsgMV0gLSAxMjggPDwgNilcbiAgICAgICAgICAgICsgYUNoYXJzW25JZHggKyAyXSAtIDEyOFxuICAgICAgICAgICAgOiBuUGFydCA+IDE5MSAmJiBuUGFydCA8IDIyNCAmJiBuSWR4ICsgMSA8IG5MZW4gP1xuICAgICAgICAgICAgICAvKiB0d28gYnl0ZXMgKi8gKG5QYXJ0IC0gMTkyIDw8IDYpICsgYUNoYXJzW25JZHggKyAxXSAtIDEyOFxuICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgIC8qIG9uZSBieXRlICovIG5QYXJ0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcHV0VVRGOENoYXJDb2RlKGFUYXJnZXQ6IFVpbnQ4QXJyYXksIG5DaGFyOiBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgblB1dEF0OiBudW1iZXIpOm51bWJlciB7XG5cbiAgICBsZXQgbklkeCA9IG5QdXRBdDtcblxuICAgIGlmIChuQ2hhciA8IDB4ODAgLyogMTI4ICovKSB7XG4gICAgICAvKiBvbmUgYnl0ZSAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gbkNoYXI7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4ODAwIC8qIDIwNDggKi8pIHtcbiAgICAgIC8qIHR3byBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhjMCAvKiAxOTIgKi8gKyAobkNoYXIgPj4+IDYpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgaWYgKG5DaGFyIDwgMHgxMDAwMCAvKiA2NTUzNiAqLykge1xuICAgICAgLyogdGhyZWUgYnl0ZXMgKi9cbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ZTAgLyogMjI0ICovICsgKG5DaGFyID4+PiAxMik7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH0gZWxzZSBpZiAobkNoYXIgPCAweDIwMDAwMCAvKiAyMDk3MTUyICovKSB7XG4gICAgICAvKiBmb3VyIGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGYwIC8qIDI0MCAqLyArIChuQ2hhciA+Pj4gMTgpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxMikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gNikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKG5DaGFyICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4NDAwMDAwMCAvKiA2NzEwODg2NCAqLykge1xuICAgICAgLyogZml2ZSBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhmOCAvKiAyNDggKi8gKyAobkNoYXIgPj4+IDI0KTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTgpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDEyKSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiA2KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgLyogaWYgKG5DaGFyIDw9IDB4N2ZmZmZmZmYpICovIHsgLyogMjE0NzQ4MzY0NyAqL1xuICAgICAgLyogc2l4IGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGZjIC8qIDI1MiAqLyArIC8qIChuQ2hhciA+Pj4gMzApIG1heSBiZSBub3Qgc2FmZSBpbiBFQ01BU2NyaXB0ISBTby4uLjogKi8gKG5DaGFyIC8gMTA3Mzc0MTgyNCk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDI0KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxOCkgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTIpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH1cblxuICAgIHJldHVybiBuSWR4O1xuXG4gIH07XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0VVRGOENoYXJMZW5ndGgobkNoYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIG5DaGFyIDwgMHg4MCA/IDEgOiBuQ2hhciA8IDB4ODAwID8gMiA6IG5DaGFyIDwgMHgxMDAwMFxuICAgICAgPyAzIDogbkNoYXIgPCAweDIwMDAwMCA/IDQgOiBuQ2hhciA8IDB4NDAwMDAwMCA/IDUgOiA2O1xuICB9XG5cblxuICAvLyBwcml2YXRlIHN0YXRpYyBsb2FkVVRGMTZDaGFyQ29kZShhQ2hhcnM6IFVpbnQxNkFycmF5LCBuSWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAvL1xuICAvLyAgIC8qIFVURi0xNiB0byBET01TdHJpbmcgZGVjb2RpbmcgYWxnb3JpdGhtICovXG4gIC8vICAgbGV0IG5GcnN0Q2hyID0gYUNoYXJzW25JZHhdO1xuICAvL1xuICAvLyAgIHJldHVybiBuRnJzdENociA+IDB4RDdCRiAvKiA1NTIzMSAqLyAmJiBuSWR4ICsgMSA8IGFDaGFycy5sZW5ndGggP1xuICAvLyAgICAgKG5GcnN0Q2hyIC0gMHhEODAwIC8qIDU1Mjk2ICovIDw8IDEwKSArIGFDaGFyc1tuSWR4ICsgMV0gKyAweDI0MDAgLyogOTIxNiAqL1xuICAvLyAgICAgOiBuRnJzdENocjtcbiAgLy8gfVxuICAvL1xuICAvLyBwcml2YXRlIHN0YXRpYyBwdXRVVEYxNkNoYXJDb2RlKGFUYXJnZXQ6IFVpbnQxNkFycmF5LCBuQ2hhcjogbnVtYmVyLCBuUHV0QXQ6IG51bWJlcik6bnVtYmVyIHtcbiAgLy9cbiAgLy8gICBsZXQgbklkeCA9IG5QdXRBdDtcbiAgLy9cbiAgLy8gICBpZiAobkNoYXIgPCAweDEwMDAwIC8qIDY1NTM2ICovKSB7XG4gIC8vICAgICAvKiBvbmUgZWxlbWVudCAqL1xuICAvLyAgICAgYVRhcmdldFtuSWR4KytdID0gbkNoYXI7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIC8qIHR3byBlbGVtZW50cyAqL1xuICAvLyAgICAgYVRhcmdldFtuSWR4KytdID0gMHhEN0MwIC8qIDU1MjMyICovICsgKG5DaGFyID4+PiAxMCk7XG4gIC8vICAgICBhVGFyZ2V0W25JZHgrK10gPSAweERDMDAgLyogNTYzMjAgKi8gKyAobkNoYXIgJiAweDNGRiAvKiAxMDIzICovKTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgcmV0dXJuIG5JZHg7XG4gIC8vIH1cbiAgLy9cbiAgLy8gcHJpdmF0ZSBzdGF0aWMgZ2V0VVRGMTZDaGFyTGVuZ3RoKG5DaGFyOiBudW1iZXIpOiBudW1iZXIge1xuICAvLyAgIHJldHVybiBuQ2hhciA8IDB4MTAwMDAgPyAxIDogMjtcbiAgLy8gfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZyB7XG4gICAgaWYgKHRoaXMuc3RyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0clxuICAgIH1cblxuICAgIGxldCBjb2RlcyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgZm9yIChsZXQgdXRmOGkgPSAwOyB1dGY4aSA8IHRoaXMucmF3Lmxlbmd0aDspIHtcbiAgICAgIGxldCBjb2RlID0gVXRmOC5sb2FkVVRGOENoYXJDb2RlKHRoaXMucmF3LCB1dGY4aSk7XG4gICAgICBjb2Rlcy5wdXNoKGNvZGUpO1xuICAgICAgdXRmOGkgKz0gVXRmOC5nZXRVVEY4Q2hhckxlbmd0aChjb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0ciA9IFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVzKTtcblxuICAgIHJldHVybiB0aGlzLnN0cjtcbiAgfVxuXG4gIHB1YmxpYyBjb2RlUG9pbnRBdChpbmRleDogbnVtYmVyKTpBcnJheUJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMucmF3LnNsaWNlKHRoaXMuaW5kZXhlc1tpbmRleF0sIHRoaXMuaW5kZXhlc1tpbmRleCsxXSk7XG4gIH1cblxufVxuXG5cbiIsIlxuZXhwb3J0IHtEdXJhdGlvbiwgSG91ciwgU2Vjb25kLCBNaW51dGUsIE1pY3Jvc2Vjb25kLCBNaWxsaXNlY29uZH0gZnJvbSBcIi4vc3JjL2R1cmF0aW9uXCJcblxuXG4iLCJcblxuZXhwb3J0IHR5cGUgRHVyYXRpb24gPSBudW1iZXJcblxuZXhwb3J0IGNvbnN0IE1pY3Jvc2Vjb25kID0gMVxuZXhwb3J0IGNvbnN0IE1pbGxpc2Vjb25kID0gMTAwMCAqIE1pY3Jvc2Vjb25kXG5leHBvcnQgY29uc3QgU2Vjb25kID0gMTAwMCAqIE1pbGxpc2Vjb25kXG5leHBvcnQgY29uc3QgTWludXRlID0gNjAgKiBTZWNvbmRcbmV4cG9ydCBjb25zdCBIb3VyID0gNjAgKiBNaW51dGUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBjbGllbnQ6IENsaWVudFxuaW1wb3J0IHtDbGllbnQsIENvbm5FcnJvcn0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1iYXNlXCJcbmltcG9ydCB7TmV3Q2xpZW50fSBmcm9tIFwic3JjXCJcblxuXG5sZXQgY2xpZW50OiBDbGllbnR8bnVsbCA9IG51bGxcbmxldCB1cmwgPSBcIlwiXG5cbmZ1bmN0aW9uIGhlYWRlcnMoY2FjaGU6IENhY2hlKTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gIGxldCByZXQ6TWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKVxuICBsZXQga2V5OiBzdHJpbmcgPSBcIlwiXG5cbiAga2V5ID0gKCQoXCIja2V5MVwiKS52YWwoKSBhcyBzdHJpbmcpLnRyaW0oKVxuICBpZiAoa2V5ICE9PSBcIlwiKSB7XG4gICAgY2FjaGUua2V5MSA9IGtleVxuICAgIGNhY2hlLnZhbHVlMSA9ICgkKFwiI3ZhbHVlMVwiKS52YWwoKSBhcyBzdHJpbmcpLnRyaW0oKVxuICAgIHJldC5zZXQoa2V5LCBjYWNoZS52YWx1ZTEpXG4gIH0gZWxzZSB7XG4gICAgY2FjaGUua2V5MSA9IFwiXCJcbiAgICBjYWNoZS52YWx1ZTEgPSBcIlwiXG4gIH1cblxuICBrZXkgPSAoJChcIiNrZXkyXCIpLnZhbCgpIGFzIHN0cmluZykudHJpbSgpXG4gIGlmIChrZXkgIT09IFwiXCIpIHtcbiAgICBjYWNoZS5rZXkyID0ga2V5XG4gICAgY2FjaGUudmFsdWUyID0gKCQoXCIjdmFsdWUyXCIpLnZhbCgpIGFzIHN0cmluZykudHJpbSgpXG4gICAgcmV0LnNldChrZXksIGNhY2hlLnZhbHVlMilcbiAgfSBlbHNlIHtcbiAgICBjYWNoZS5rZXkyID0gXCJcIlxuICAgIGNhY2hlLnZhbHVlMiA9IFwiXCJcbiAgfVxuXG4gIGtleSA9ICgkKFwiI2tleTNcIikudmFsKCkgYXMgc3RyaW5nKS50cmltKClcbiAgaWYgKGtleSAhPT0gXCJcIikge1xuICAgIGNhY2hlLmtleTMgPSBrZXlcbiAgICBjYWNoZS52YWx1ZTMgPSAoJChcIiN2YWx1ZTNcIikudmFsKCkgYXMgc3RyaW5nKS50cmltKClcbiAgICByZXQuc2V0KGtleSwgY2FjaGUudmFsdWUzKVxuICB9IGVsc2Uge1xuICAgIGNhY2hlLmtleTMgPSBcIlwiXG4gICAgY2FjaGUudmFsdWUzID0gXCJcIlxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBwcmludChzdHJpbmc6IHN0cmluZykge1xuICBsZXQgYm9keSA9ICQoJ2JvZHknKTtcbiAgYm9keS5hcHBlbmQoXCI8cD5cIitzdHJpbmcrXCI8L3A+XCIpO1xufVxuZnVuY3Rpb24gcHJpbnRQdXNoKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCBib2R5ID0gJCgnYm9keScpO1xuICBib2R5LmFwcGVuZChcIjxwIHN0eWxlPSdjb2xvcjogY2FkZXRibHVlJz5cIitzdHJpbmcrXCI8L3A+XCIpO1xufVxuZnVuY3Rpb24gcHJpbnRFcnJvcihzdHJpbmc6IHN0cmluZykge1xuICBsZXQgYm9keSA9ICQoJ2JvZHknKTtcbiAgYm9keS5hcHBlbmQoXCI8cCBzdHlsZT0nY29sb3I6IHJlZCc+XCIrc3RyaW5nK1wiPC9wPlwiKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmQoKSB7XG4gIGxldCB3c3MgPSAkKFwiI3dzc1wiKS52YWwoKVxuICBpZiAoY2xpZW50ID09PSBudWxsIHx8IHVybCAhPSB3c3MpIHtcbiAgICB1cmwgPSB3c3MgYXMgc3RyaW5nXG4gICAgY2xpZW50ID0gTmV3Q2xpZW50KHVybClcbiAgICBjbGllbnQuc2V0UHVzaENhbGxiYWNrKChkYXRhKT0+e1xuICAgICAgcHJpbnRQdXNoKFwicHVzaDogXCIgKyBkYXRhLnRvU3RyaW5nKCkpXG4gICAgfSlcbiAgICBjbGllbnQuc2V0UGVlckNsb3NlZENhbGxiYWNrKCgpPT57XG4gICAgICBwcmludEVycm9yKFwiY29ubjogY2xvc2VkIGJ5IHBlZXJcIilcbiAgICB9KVxuICB9XG5cbiAgbGV0IGNhY2hlID0gbmV3IENhY2hlKClcbiAgY2FjaGUud3NzID0gdXJsXG5cbiAgY2FjaGUuZGF0YSA9ICQoXCIjcG9zdFwiKS52YWwoKSBhcyBzdHJpbmdcblxuICBsZXQgW3JldCwgZXJyXSA9IGF3YWl0IGNsaWVudC5zZW5kKGNhY2hlLmRhdGEsIGhlYWRlcnMoY2FjaGUpKVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RcIiwgSlNPTi5zdHJpbmdpZnkoY2FjaGUpKVxuXG4gIGlmIChlcnIgIT09IG51bGwpIHtcbiAgICBpZiAoZXJyIGluc3RhbmNlb2YgQ29ubkVycm9yKSB7XG4gICAgICBjbGllbnQgPSBudWxsXG4gICAgICBwcmludEVycm9yKFwiY29ubi1lcnJvcjogXCIgKyBlcnIubWVzc2FnZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcHJpbnRFcnJvcihcInJlc3AtZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHByaW50KFwicmVzcDogXCIgKyByZXQudG9TdHJpbmcoKSArIFwiXFxuIC0tLT4ganNvbjogc2VlIHRoZSAnY29uc29sZSdcIilcbiAgICBjb25zb2xlLmxvZyhcInJlc3AtLS1qc29uOiBcIilcbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHJldC50b1N0cmluZygpKSlcbiAgfVxufVxuXG4kKFwiI3NlbmRcIikub24oXCJjbGlja1wiLCBhc3luYyAoKT0+e1xuICBhd2FpdCBzZW5kKClcbn0pXG5cbmNsYXNzIENhY2hlIHtcbiAgd3NzOiBzdHJpbmcgPSBcIlwiXG4gIGtleTE6IHN0cmluZyA9IFwiXCJcbiAgdmFsdWUxOiBzdHJpbmcgPSBcIlwiXG4gIGtleTI6IHN0cmluZyA9IFwiXCJcbiAgdmFsdWUyOiBzdHJpbmcgPSBcIlwiXG4gIGtleTM6IHN0cmluZyA9IFwiXCJcbiAgdmFsdWUzOiBzdHJpbmcgPSBcIlwiXG4gIGRhdGE6IHN0cmluZyA9IFwiXCJcbn1cblxuJCgoKT0+e1xuICBsZXQgY2FjaGVTID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYXN0XCIpXG4gIGxldCBjYWNoZTogQ2FjaGVcbiAgaWYgKGNhY2hlUyA9PT0gbnVsbCkge1xuICAgIGNhY2hlID0gbmV3IENhY2hlKClcbiAgfSBlbHNlIHtcbiAgICBjYWNoZSA9IEpTT04ucGFyc2UoY2FjaGVTKSBhcyBDYWNoZVxuICB9XG5cbiAgJChcIiNrZXkxXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS5rZXkxKVxuICAkKFwiI3ZhbHVlMVwiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUudmFsdWUxKVxuICAkKFwiI2tleTJcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLmtleTIpXG4gICQoXCIjdmFsdWUyXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS52YWx1ZTIpXG4gICQoXCIja2V5M1wiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUua2V5MylcbiAgJChcIiN2YWx1ZTNcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLnZhbHVlMylcbiAgJChcIiN3c3NcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLndzcylcbiAgJChcIiNwb3N0XCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS5kYXRhKVxufSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==