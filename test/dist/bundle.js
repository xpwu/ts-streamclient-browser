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
    // ws or wss ?????????
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
                    // push ack ??????????????????????????????????????????
                    this.net.WriteForce(res.newPushAck());
                    // ????????????
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
                // ????????????
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
                    resolve([new Result(new _utf8__WEBPACK_IMPORTED_MODULE_5__.Utf8(res.data())), null]);
                });
                timer = setTimeout(() => {
                    this.allReq.delete(reqId);
                    resolve([emptyResult, new Error("timeout")]);
                }, this.op.requestTimeout / ts_xutils__WEBPACK_IMPORTED_MODULE_3__.Millisecond);
            });
            err = yield this.net.Write(req.ToData());
            // ????????????????????????????????????????????????????????????
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
            // ??????????????????????????????
            this.websocket.onmessage = this.onmessage;
            // ???????????????????????????onopen
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
        // ???????????????
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
    // ?????????????????????????????????????????????????????????????????????connecting/connect/closing)??????????????????????????????????????????????????????????????????????????????
    // ???????????????????????????????????????????????????????????????closing?????????(?????????????????????)?????????Connect??????????????????????????????????????????????????????????????????
    // ???onerror ??? onclose ??????????????????????????????
    // ?????????????????????????????????????????????(???????????????closing?????????connecting)???????????????net.handle??????????????????????????????????????????
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
                    // ??????????????????1?????????url????????????????????????new?????????????????????2????????????????????????????????????????????????onerror?????????????????????onclose
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
                    // ?????????????????????????????????????????????????????????????????? onerror?????????
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
                    // ?????????????????????????????????????????????websocket????????????????????????????????????????????????????????????????????????????????????????????????
                    // ??????????????????1?????????url????????????????????????new?????????????????????2????????????????????????????????????????????????onerror?????????????????????onclose
                    // ????????????????????????????????????????????????this.conn??????????????????????????????
                    if (this.conn === null) {
                        return;
                    }
                    // ?????????onerror ???????????????onclose
                    this.conn.onclose = () => { };
                    // ??????????????????????????????????????????pending??????(?????????????????????)??????????????????????????????
                    // ??????????????????response??????????????????????????????????????????????????????????????????????????????pending
                    // todo: ??????????????????????????? ????????? ??? ????????? ??????
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztRQUVuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUN2QixDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1RCxHQUFHLEVBQUUsQ0FBQztZQUNOLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUN4QixDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxHQUFHLEVBQUUsQ0FBQztZQUNOLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztTQUMzQjtRQUNELENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxHQUFHLEVBQUUsQ0FBQztRQUVOLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLFFBQVEsQ0FBQyxFQUFTO1FBQ3ZCLENB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Q0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNsQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3RDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvY29ubmVycm9yLnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL2Zha2VodHRwLnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJhc2Uvc3JjL25ldC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1iYXNlL3NyYy9vcHRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy90cy1zdHJlYW1jbGllbnQtYmFzZS9zcmMvdXRmOC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXN0cmVhbWNsaWVudC1icm93c2VyL2luZGV4LnRzIiwid2VicGFjazovL3Rlc3QvLi9ub2RlX21vZHVsZXMvdHMtc3RyZWFtY2xpZW50LWJyb3dzZXIvc3JjL3dlYnNvY2tldC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL3RzLXh1dGlscy9zcmMvZHVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCB7Q2xpZW50LCBSZXN1bHR9IGZyb20gXCIuL3NyYy9jbGllbnRcIlxuXG5leHBvcnQge1V0Zjh9IGZyb20gXCIuL3NyYy91dGY4XCJcblxuZXhwb3J0IHtFdmVudCwgRXJyb3JFdmVudCwgV2ViU29ja2V0Q29uc3RydWN0b3IsIFdlYlNvY2tldEludGVyZmFjZSwgQ2xvc2VFdmVudCwgQ29ubmVjdGlvbiwgTWVzc2FnZUV2ZW50fSBmcm9tIFwiLi9zcmMvY29ubmVjdGlvblwiXG5cbmV4cG9ydCB7T3B0aW9uLCBSZXF1ZXN0VGltZW91dCwgQ29ubmVjdFRpbWVvdXQsIFdlYlNvY2tldH0gZnJvbSBcIi4vc3JjL29wdGlvblwiXG5cbmV4cG9ydCB7Q29ubkVycm9yfSBmcm9tIFwiLi9zcmMvY29ubmVycm9yXCJcbiIsIlxuaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZSwgU3RhdHVzfSBmcm9tIFwiLi9mYWtlaHR0cFwiO1xuaW1wb3J0IHtOZXR9IGZyb20gXCIuL25ldFwiXG5pbXBvcnQge29wdGlvbiwgT3B0aW9ufSBmcm9tIFwiLi9vcHRpb25cIlxuaW1wb3J0IHtNaWxsaXNlY29uZH0gZnJvbSBcInRzLXh1dGlsc1wiXG5pbXBvcnQge0Nsb3NlRXZlbnR9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIlxuaW1wb3J0IHtDb25uRXJyb3J9IGZyb20gXCIuL2Nvbm5lcnJvclwiXG5pbXBvcnQge1V0Zjh9IGZyb20gXCIuL3V0ZjhcIlxuXG5leHBvcnQgY2xhc3MgUmVzdWx0IHtcbiAgcHVibGljIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy51dGY4LnRvU3RyaW5nKClcbiAgfVxuXG4gIHB1YmxpYyByYXdCdWZmZXIoKTpVaW50OEFycmF5IHtcbiAgICByZXR1cm4gdGhpcy51dGY4LnJhd1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGY4OlV0ZjgpIHtcbiAgfVxufVxuXG5sZXQgZW1wdHlSZXN1bHQgPSBuZXcgUmVzdWx0KG5ldyBVdGY4KFwiXCIpKVxuXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBuZXQ6IE5ldDtcbiAgcHJpdmF0ZSBhbGxSZXE6IE1hcDxudW1iZXIsIChyZXN1bHQ6IHtyZXM6IFJlc3BvbnNlLCBlcnI6IG51bGx9fHtyZXM6IG51bGwsIGVycjogRXJyb3J9KSA9PiB2b2lkPjtcbiAgcHJpdmF0ZSByZXFJZDogbnVtYmVyO1xuICAvLyBwcml2YXRlIG9uUHVzaDogKHJlczpzdHJpbmcpPT5Qcm9taXNlPHZvaWQ+ID0gKHJlczpzdHJpbmcpPT57cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpfTtcbiAgLy8gcHJpdmF0ZSBvblBlZXJDbG9zZWQ6ICgpPT5Qcm9taXNlPHZvaWQ+ID0gKCk9PntyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCl9O1xuICBwcml2YXRlIG9uUHVzaDogKHJlczpSZXN1bHQpPT52b2lkID0gKCk9Pnt9O1xuICBwcml2YXRlIG9uUGVlckNsb3NlZDogKCk9PnZvaWQgPSAoKT0+e307XG4gIHByaXZhdGUgb3AgPSBuZXcgb3B0aW9uXG5cbiAgLy8gd3Mgb3Igd3NzIOWNj+iuruOAglxuICBjb25zdHJ1Y3Rvcih3c3M6IHN0cmluZywgLi4ub3BmOiBPcHRpb25bXSkge1xuICAgIGlmICh3c3MuaW5kZXhPZihcInM6Ly9cIikgPT09IC0xKSB7XG4gICAgICB3c3MgPSBcIndzOi8vXCIgKyB3c3M7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbyBvZiBvcGYpIHtcbiAgICAgIG8odGhpcy5vcClcbiAgICB9XG5cbiAgICB0aGlzLm5ldCA9IG5ldyBOZXQod3NzLCB0aGlzLm9wLmNvbm5lY3RUaW1lb3V0LCB0aGlzLm9wLndlYlNvY2tldENvbnN0cnVjdG9yLCB7XG4gICAgICBvbk1lc3NhZ2U6ICh2YWx1ZTogQXJyYXlCdWZmZXIpOiB2b2lkID0+IHtcbiAgICAgICAgbGV0IHJlcyA9IG5ldyBSZXNwb25zZSh2YWx1ZSk7XG4gICAgICAgIGlmIChyZXMuaXNQdXNoKCkpIHtcbiAgICAgICAgICAvLyBwdXNoIGFjayDlvLrliLblhpnnu5nnvZHnu5zvvIzkuI3orqHlhaXlubblj5HmjqfliLZcbiAgICAgICAgICB0aGlzLm5ldC5Xcml0ZUZvcmNlKHJlcy5uZXdQdXNoQWNrKCkpXG4gICAgICAgICAgLy8g5byC5q2l5omn6KGMXG4gICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5vblB1c2gobmV3IFJlc3VsdChuZXcgVXRmOChyZXMuZGF0YSgpKSkpXG4gICAgICAgICAgfSwgMClcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjbGIgPSB0aGlzLmFsbFJlcS5nZXQocmVzLnJlcUlEKCkpIHx8ICgoKSA9PiB7fSk7XG4gICAgICAgIHRoaXMubmV0LnJlY2VpdmVkT25lUmVzcG9uc2UoKVxuICAgICAgICBjbGIoe3JlczpyZXMsIGVycjpudWxsfSk7XG4gICAgICAgIHRoaXMuYWxsUmVxLmRlbGV0ZShyZXMucmVxSUQoKSk7XG5cbiAgICAgIH0sIG9uQ2xvc2U6IChyZXN1bHQ6IENsb3NlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5hbGxSZXEuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICB2YWx1ZSh7cmVzOm51bGwsIGVycjogbmV3IENvbm5FcnJvcihuZXcgRXJyb3IoXCJjbG9zZWQgYnkgcGVlcjogXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKSl9KVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hbGxSZXEuY2xlYXIoKVxuXG4gICAgICAgIC8vIOW8guatpeaJp+ihjFxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgdGhpcy5vblBlZXJDbG9zZWQoKVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc3RhcnQgZnJvbSAxMFxuICAgIHRoaXMucmVxSWQgPSAxMDtcbiAgICB0aGlzLmFsbFJlcSA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVXc3Mod3NzOiBzdHJpbmcpIHtcbiAgICBpZiAod3NzLmluZGV4T2YoXCJzOi8vXCIpID09PSAtMSkge1xuICAgICAgd3NzID0gXCJ3czovL1wiICsgd3NzO1xuICAgIH1cbiAgICB0aGlzLm5ldC51cGRhdGVXc3Mod3NzKVxuICB9XG5cbiAgcHVibGljIHNldFB1c2hDYWxsYmFjayhjbGIgOihyZXM6UmVzdWx0KT0+dm9pZCkge1xuICAgIHRoaXMub25QdXNoID0gY2xiO1xuICB9XG5cbiAgcHVibGljIHNldFBlZXJDbG9zZWRDYWxsYmFjayhjbGIgOigpPT52b2lkKSB7XG4gICAgdGhpcy5vblBlZXJDbG9zZWQgPSBjbGI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VuZChkYXRhOiBBcnJheUJ1ZmZlciB8IHN0cmluZywgaGVhZGVyPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICA6IFByb21pc2U8W1Jlc3VsdCwgRXJyb3IgfCBudWxsXT4ge1xuXG4gICAgbGV0IGVyciA9IGF3YWl0IHRoaXMubmV0LkNvbm5lY3QoKTtcbiAgICBpZiAoZXJyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBbZW1wdHlSZXN1bHQsIG5ldyBDb25uRXJyb3IoZXJyKV07XG4gICAgfVxuXG4gICAgbGV0IHJlcSA9IG5ldyBSZXF1ZXN0KGRhdGEsIGhlYWRlcik7XG4gICAgbGV0IHJlcUlkID0gdGhpcy5yZXFJZCsrO1xuICAgIHJlcS5TZXRSZXFJZChyZXFJZCk7XG5cbiAgICBsZXQgdGltZXI6bnVtYmVyfHVuZGVmaW5lZFxuICAgIGxldCByZXMgPSBuZXcgUHJvbWlzZTxbUmVzdWx0LCBFcnJvciB8IG51bGxdPihcbiAgICAgIChyZXNvbHZlOiAocmV0OiBbUmVzdWx0LCBFcnJvciB8IG51bGwgXSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICB0aGlzLmFsbFJlcS5zZXQocmVxSWQsIChyZXN1bHQpPT57XG4gICAgICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc3VsdC5lcnIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJlc29sdmUoW2VtcHR5UmVzdWx0LCByZXN1bHQuZXJyXSk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVzID0gcmVzdWx0LnJlc1xuICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSBTdGF0dXMuT2spIHtcbiAgICAgICAgICAgIHJlc29sdmUoW2VtcHR5UmVzdWx0LCBuZXcgRXJyb3IobmV3IFV0ZjgocmVzLmRhdGEoKSkudG9TdHJpbmcoKSldKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUoW25ldyBSZXN1bHQobmV3IFV0ZjgocmVzLmRhdGEoKSkpLCBudWxsXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgIHRoaXMuYWxsUmVxLmRlbGV0ZShyZXFJZClcbiAgICAgICAgICByZXNvbHZlKFtlbXB0eVJlc3VsdCwgbmV3IEVycm9yKFwidGltZW91dFwiKV0pO1xuICAgICAgICB9LCB0aGlzLm9wLnJlcXVlc3RUaW1lb3V0L01pbGxpc2Vjb25kKWFzIHVua25vd24gYXMgbnVtYmVyO1xuICAgICAgfSlcblxuICAgIGVyciA9IGF3YWl0IHRoaXMubmV0LldyaXRlKHJlcS5Ub0RhdGEoKSk7XG4gICAgLy8g5ZCR572R57uc5YaZ5pWw5o2u5aSx6LSl77yM5Lmf5bqU6K+l5b2S5Li66L+e5o6l5bGC55qE6ZSZ6K+vXG4gICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFsbFJlcS5kZWxldGUocmVxSWQpXG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtlbXB0eVJlc3VsdCwgbmV3IENvbm5FcnJvcihlcnIpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVjb3ZlcigpOiBQcm9taXNlPEVycm9yfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQuQ29ubmVjdCgpO1xuICB9XG59XG5cbiIsIlxuZXhwb3J0IGludGVyZmFjZSBFdmVudCB7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgcmVhZG9ubHkgZGF0YTogQXJyYXlCdWZmZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbG9zZUV2ZW50IGV4dGVuZHMgRXZlbnR7XG4gIHJlYWRvbmx5IGNvZGU6IG51bWJlcjtcbiAgcmVhZG9ubHkgcmVhc29uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JFdmVudCBleHRlbmRzIEV2ZW50e1xuICBlcnJNc2c6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlNvY2tldEludGVyZmFjZSB7XG4gIG9uY2xvc2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogQ2xvc2VFdmVudCkgPT4gYW55KTtcbiAgb25lcnJvcjogKCh0aGlzOiBXZWJTb2NrZXRJbnRlcmZhY2UsIGV2OiBFcnJvckV2ZW50KSA9PiBhbnkpO1xuICBvbm1lc3NhZ2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogTWVzc2FnZUV2ZW50KSA9PiBhbnkpO1xuICBvbm9wZW46ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXZlbnQpID0+IGFueSk7XG5cbiAgY2xvc2UoY29kZT86IG51bWJlciwgcmVhc29uPzogc3RyaW5nKTogdm9pZDtcbiAgc2VuZChkYXRhOiBBcnJheUJ1ZmZlcik6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2ViU29ja2V0Q29uc3RydWN0b3Ige1xuICBuZXcgKHVybDogc3RyaW5nKTogV2ViU29ja2V0SW50ZXJmYWNlXG59XG5cbmV4cG9ydCBjbGFzcyBEdW1teVdzIGltcGxlbWVudHMgV2ViU29ja2V0SW50ZXJmYWNle1xuICBvbmNsb3NlID0gKCk9Pnt9XG4gIG9uZXJyb3IgPSAoKT0+e31cbiAgb25tZXNzYWdlID0gKCk9Pnt9XG4gIG9ub3BlbiA9ICgpPT57fVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICB9XG5cbiAgc2VuZCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3Qgc2V0IFdlYlNvY2tldENvbnN0cnVjdG9yXCIpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xuXG4gIHByaXZhdGUgbWF4Q29uY3VycmVudCA6IG51bWJlciA9IDU7XG4gIHByaXZhdGUgbWF4Qnl0ZXM6IG51bWJlciA9IDQgKiAxMDI0ICogMTAyNDtcbiAgcHJpdmF0ZSBjb25uZWN0SUQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgcHVibGljIG9uY2xvc2U6ICgoZXY6IENsb3NlRXZlbnQpID0+IGFueSkgPSAoKT0+e307XG4gIHB1YmxpYyBvbmVycm9yOiAoKGV2OiBFcnJvckV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuICBwdWJsaWMgb25tZXNzYWdlOiAoKGV2OiBNZXNzYWdlRXZlbnQpID0+IGFueSkgPSAoKT0+e307XG4gIHB1YmxpYyBvbm9wZW46ICgoZXY6IEV2ZW50KSA9PiBhbnkpID0gKCk9Pnt9O1xuXG4gIHByaXZhdGUgd2FpdGluZ1NlbmQgPSBuZXcgQXJyYXk8QXJyYXlCdWZmZXI+KClcbiAgcHJpdmF0ZSBjb25jdXJyZW50ID0gMFxuXG4gIHByaXZhdGUgd2Vic29ja2V0OiBXZWJTb2NrZXRJbnRlcmZhY2U7XG5cbiAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIHdlYnNvY2tldENvbnN0cnVjdG9yOiBXZWJTb2NrZXRDb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IHdlYnNvY2tldENvbnN0cnVjdG9yKHVybClcblxuICAgIHRoaXMud2Vic29ja2V0Lm9uY2xvc2UgPSAoZXY6IENsb3NlRXZlbnQpPT57XG4gICAgICB0aGlzLm9uY2xvc2UoZXYpXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9uZXJyb3IgPSAoZXY6IEVycm9yRXZlbnQpPT57XG4gICAgICB0aGlzLm9uZXJyb3IoZXYpXG4gICAgfVxuICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IChyZXN1bHQ6IE1lc3NhZ2VFdmVudCk9PntcbiAgICAgIGxldCBlcnIgPSB0aGlzLnJlYWRIYW5kc2hha2UocmVzdWx0KVxuICAgICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKCk9Pnt9XG4gICAgICAgIHRoaXMud2Vic29ja2V0Lm9uZXJyb3IgPSAoKT0+e31cbiAgICAgICAgdGhpcy53ZWJzb2NrZXQub25vcGVuID0gKCk9Pnt9XG4gICAgICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9ICgpPT57fVxuXG4gICAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgICAgIHRoaXMub25lcnJvcih7ZXJyTXNnOiBlcnIubWVzc2FnZX0pXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIOiuvue9ruS4uuecn+ato+eahOaOpeaUtuWHveaVsFxuICAgICAgdGhpcy53ZWJzb2NrZXQub25tZXNzYWdlID0gdGhpcy5vbm1lc3NhZ2VcblxuICAgICAgLy8g5o+h5omL57uT5p2f5omN5piv55yf5q2j55qEb25vcGVuXG4gICAgICB0aGlzLm9ub3Blbih7fSlcbiAgICB9XG4gICAgdGhpcy53ZWJzb2NrZXQub25vcGVuID0gKF86IEV2ZW50KT0+e1xuICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAgSGVhcnRCZWF0X3MgfCBGcmFtZVRpbWVvdXRfcyB8IE1heENvbmN1cnJlbnQgfCBNYXhCeXRlcyB8IGNvbm5lY3QgaWRcbiAgICBIZWFydEJlYXRfczogMiBieXRlcywgbmV0IG9yZGVyXG4gICAgRnJhbWVUaW1lb3V0X3M6IDEgYnl0ZSAgPT09MFxuICAgIE1heENvbmN1cnJlbnQ6IDEgYnl0ZVxuICAgIE1heEJ5dGVzOiA0IGJ5dGVzLCBuZXQgb3JkZXJcbiAgICBjb25uZWN0IGlkOiA4IGJ5dGVzLCBuZXQgb3JkZXJcbiovXG4gIHByaXZhdGUgcmVhZEhhbmRzaGFrZShyZXN1bHQ6IE1lc3NhZ2VFdmVudCk6IEVycm9yIHwgbnVsbCB7XG4gICAgbGV0IGJ1ZmZlciA9IHJlc3VsdC5kYXRhXG4gICAgaWYgKGJ1ZmZlci5ieXRlTGVuZ3RoICE9IDE2KSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKFwibGVuKGhhbmRzaGFrZSkgIT0gMTZcIilcbiAgICB9XG5cbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuXG4gICAgdGhpcy5tYXhDb25jdXJyZW50ID0gdmlldy5nZXRVaW50OCgzKTtcbiAgICB0aGlzLm1heEJ5dGVzID0gdmlldy5nZXRVaW50MzIoNCk7XG4gICAgdGhpcy5jb25uZWN0SUQgPSAoXCIwMDAwMDAwMFwiICsgdmlldy5nZXRVaW50MzIoOCkudG9TdHJpbmcoMTYpKS5zbGljZSgtOCkgK1xuICAgICAgKFwiMDAwMDAwMDBcIiArIHZpZXcuZ2V0VWludDMyKDEyKS50b1N0cmluZygxNikpLnNsaWNlKC04KTtcbiAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RJRCA9IFwiLCB0aGlzLmNvbm5lY3RJRClcblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBwdWJsaWMgcmVjZWl2ZWRPbmVSZXNwb25zZSgpOnZvaWQge1xuICAgIHRoaXMuY29uY3VycmVudC0tXG4gICAgLy8g6Ziy5b6h5oCn5Luj56CBXG4gICAgaWYgKHRoaXMuY29uY3VycmVudCA8IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihcImNvbm5lY3Rpb24uY29uY3VycmVudCA8IDBcIilcbiAgICAgIHRoaXMuY29uY3VycmVudCA9IDBcbiAgICB9XG5cbiAgICB0aGlzLl9zZW5kKClcbiAgfVxuXG4gIHByaXZhdGUgX3NlbmQoKTp2b2lkIHtcbiAgICBpZiAodGhpcy5jb25jdXJyZW50ID4gdGhpcy5tYXhDb25jdXJyZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy53YWl0aW5nU2VuZC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jb25jdXJyZW50KytcblxuICAgIHRoaXMud2Vic29ja2V0LnNlbmQodGhpcy53YWl0aW5nU2VuZC5zaGlmdCgpISlcbiAgfVxuXG4gIHB1YmxpYyBzZW5kKGRhdGE6IEFycmF5QnVmZmVyKTogRXJyb3IgfCBudWxsIHtcbiAgICBpZiAoZGF0YS5ieXRlTGVuZ3RoID4gdGhpcy5tYXhCeXRlcykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcImRhdGEgaXMgdG9vIGxhcmdlISBNdXN0IGJlIGxlc3MgdGhhbiBcIiArIHRoaXMubWF4Qnl0ZXMudG9TdHJpbmcoKSArIFwiLiBcIilcbiAgICB9XG5cbiAgICB0aGlzLndhaXRpbmdTZW5kLnB1c2goZGF0YSlcbiAgICB0aGlzLl9zZW5kKClcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcHVibGljIFNlbmRGb3JjZShkYXRhOiBBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMud2Vic29ja2V0LnNlbmQoZGF0YSlcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpXG4gIH1cbn1cbiIsIlxuXG5leHBvcnQgY2xhc3MgQ29ubkVycm9yIGltcGxlbWVudHMgRXJyb3J7XG4gIG1lc3NhZ2U6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3RhY2s/OiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihlcnJvcjogRXJyb3IpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlXG4gICAgdGhpcy5uYW1lID0gZXJyb3IubmFtZVxuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFja1xuICB9XG59IiwiXG4vKipcblxuIGNvbnRlbnQgcHJvdG9jb2w6XG4gICByZXF1ZXN0IC0tLVxuICAgICByZXFpZCB8IGhlYWRlcnMgfCBoZWFkZXItZW5kLWZsYWcgfCBkYXRhXG4gICAgIHJlcWlkOiA0IGJ5dGVzLCBuZXQgb3JkZXI7XG4gICAgIGhlYWRlcnM6IDwga2V5LWxlbiB8IGtleSB8IHZhbHVlLWxlbiB8IHZhbHVlID4gLi4uIDsgIFtvcHRpb25hbF1cbiAgICAga2V5LWxlbjogMSBieXRlLCAga2V5LWxlbiA9IHNpemVvZihrZXkpO1xuICAgICB2YWx1ZS1sZW46IDEgYnl0ZSwgdmFsdWUtbGVuID0gc2l6ZW9mKHZhbHVlKTtcbiAgICAgaGVhZGVyLWVuZC1mbGFnOiAxIGJ5dGUsID09PSAwO1xuICAgICBkYXRhOiAgICAgICBbb3B0aW9uYWxdXG5cbiAgICAgIHJlcWlkID0gMTogY2xpZW50IHB1c2ggYWNrIHRvIHNlcnZlci5cbiAgICAgICAgICAgIGFjazogbm8gaGVhZGVycztcbiAgICAgICAgICAgIGRhdGE6IHB1c2hJZC4gNCBieXRlcywgbmV0IG9yZGVyO1xuXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICByZXNwb25zZSAtLS1cbiAgICAgcmVxaWQgfCBzdGF0dXMgfCBkYXRhXG4gICAgIHJlcWlkOiA0IGJ5dGVzLCBuZXQgb3JkZXI7XG4gICAgIHN0YXR1czogMSBieXRlLCAwLS0tc3VjY2VzcywgMS0tLWZhaWxlZFxuICAgICBkYXRhOiBpZiBzdGF0dXM9PXN1Y2Nlc3MsIGRhdGE9PGFwcCBkYXRhPiAgICBbb3B0aW9uYWxdXG4gICAgIGlmIHN0YXR1cz09ZmFpbGVkLCBkYXRhPTxlcnJvciByZWFzb24+XG5cblxuICAgIHJlcWlkID0gMTogc2VydmVyIHB1c2ggdG8gY2xpZW50XG4gICAgICAgIHN0YXR1czogMFxuICAgICAgICAgIGRhdGE6IGZpcnN0IDQgYnl0ZXMgLS0tIHB1c2hJZCwgbmV0IG9yZGVyO1xuICAgICAgICAgICAgICAgIGxhc3QgLS0tIHJlYWwgZGF0YVxuXG4gKi9cblxuaW1wb3J0IHtVdGY4fSBmcm9tIFwiLi91dGY4XCI7XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSByZWFkb25seSBidWZmZXI6IEFycmF5QnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6QXJyYXlCdWZmZXJ8c3RyaW5nLCBoZWFkZXI/Ok1hcDxzdHJpbmcsc3RyaW5nPikge1xuICAgIGxldCBsZW4gPSA0O1xuICAgIGhlYWRlciA9IGhlYWRlciB8fCBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gICAgbGV0IGhlYWRlckFyciA9IG5ldyBBcnJheTx7a2V5OlV0ZjgsIHZhbHVlOlV0Zjh9PigpO1xuXG4gICAgaGVhZGVyLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nLCBfOiBNYXA8c3RyaW5nLCBzdHJpbmc+KT0+e1xuICAgICAgbGV0IHV0ZjggPSB7a2V5OiBuZXcgVXRmOChrZXkpLCB2YWx1ZTogbmV3IFV0ZjgodmFsdWUpfTtcbiAgICAgIGhlYWRlckFyci5wdXNoKHV0ZjgpO1xuICAgICAgbGVuICs9IDEgKyB1dGY4LmtleS5ieXRlTGVuZ3RoICsgMSArIHV0ZjgudmFsdWUuYnl0ZUxlbmd0aDtcbiAgICB9KTtcblxuICAgIGxldCBib2R5ID0gbmV3IFV0ZjgoZGF0YSk7XG5cbiAgICBsZW4gKz0gMSArIGJvZHkuYnl0ZUxlbmd0aDtcblxuICAgIHRoaXMuYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGxlbik7XG5cbiAgICBsZXQgcG9zID0gNDtcbiAgICBmb3IgKGxldCBoIG9mIGhlYWRlckFycikge1xuICAgICAgKG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcikpLnNldFVpbnQ4KHBvcywgaC5rZXkuYnl0ZUxlbmd0aCk7XG4gICAgICBwb3MrKztcbiAgICAgIChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLnNldChoLmtleS5yYXcsIHBvcyk7XG4gICAgICBwb3MgKz0gaC5rZXkuYnl0ZUxlbmd0aDtcbiAgICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50OChwb3MsIGgudmFsdWUuYnl0ZUxlbmd0aCk7XG4gICAgICBwb3MrKztcbiAgICAgIChuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcikpLnNldChoLnZhbHVlLnJhdywgcG9zKTtcbiAgICAgIHBvcyArPSBoLnZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50OChwb3MsIDApO1xuICAgIHBvcysrO1xuXG4gICAgKG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyKSkuc2V0KGJvZHkucmF3LCBwb3MpO1xuICB9XG5cbiAgcHVibGljIFNldFJlcUlkKGlkOm51bWJlcikge1xuICAgIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIpKS5zZXRVaW50MzIoMCwgaWQpO1xuICB9XG5cbiAgcHVibGljIFRvRGF0YSgpOkFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxuXG59XG5cbmV4cG9ydCBlbnVtIFN0YXR1cyB7XG4gIE9rLFxuICBGYWlsZWRcbn1cblxuZXhwb3J0IGNsYXNzIFJlc3BvbnNlIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgc3RhdHVzOiBTdGF0dXM7XG4gIHByaXZhdGUgcmVhZG9ubHkgYnVmZmVyOiBVaW50OEFycmF5O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQXJyYXlCdWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgdGhpcy5zdGF0dXMgPSB0aGlzLmJ1ZmZlcls0XSA9PSAwP1N0YXR1cy5PayA6IFN0YXR1cy5GYWlsZWQ7XG4gIH1cblxuICBwdWJsaWMgcmVxSUQoKTpudW1iZXIge1xuICAgIHJldHVybiAobmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLmJ1ZmZlcikpLmdldFVpbnQzMigwKTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRhKCk6QXJyYXlCdWZmZXIge1xuXG4gICAgbGV0IG9mZnNldCA9IDVcbiAgICBpZiAodGhpcy5pc1B1c2goKSkge1xuICAgICAgLy8gcHVzaElkXG4gICAgICBvZmZzZXQgKz0gNFxuICAgIH1cblxuICAgIGlmICh0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoIDw9IG9mZnNldCkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5zbGljZShvZmZzZXQpLmJ1ZmZlclxuICAgIC8vIGxldCB1dGY4ID0gbmV3IFV0ZjgodGhpcy5idWZmZXIuc2xpY2Uob2Zmc2V0KSk7XG4gICAgLy8gcmV0dXJuIHV0ZjgudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1B1c2goKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yZXFJRCgpID09PSAxO1xuICB9XG5cbiAgcHVibGljIG5ld1B1c2hBY2soKTogQXJyYXlCdWZmZXIge1xuICAgIGlmICghdGhpcy5pc1B1c2goKSB8fCB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoIDw9IDQrMSs0KSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBBcnJheUJ1ZmZlcig0ICsgMSArIDQpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcocmV0KVxuICAgIHZpZXcuc2V0VWludDMyKDAsIDEpXG4gICAgdmlldy5zZXRVaW50OCg0LCAwKVxuICAgIHZpZXcuc2V0VWludDMyKDUsIChuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIuYnVmZmVyKSkuZ2V0VWludDMyKDUpKVxuXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tRXJyb3IocmVxSWQ6bnVtYmVyLCBlcnI6IEVycm9yKTpSZXNwb25zZSB7XG4gICAgbGV0IHV0ZjggPSBuZXcgVXRmOChlcnIubWVzc2FnZSk7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDQrMSArIHV0ZjguYnl0ZUxlbmd0aCk7XG4gICAgKG5ldyBEYXRhVmlldyhidWZmZXIuYnVmZmVyKSkuc2V0VWludDMyKDAsIHJlcUlkKTtcbiAgICBidWZmZXJbNF0gPSAxO1xuICAgIGJ1ZmZlci5zZXQodXRmOC5yYXcsIDUpO1xuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShidWZmZXIpO1xuICB9XG59XG4iLCJpbXBvcnQge0R1cmF0aW9uLCBNaWxsaXNlY29uZH0gZnJvbSBcInRzLXh1dGlsc1wiXG5pbXBvcnQge0Nvbm5lY3Rpb24sIE1lc3NhZ2VFdmVudCwgQ2xvc2VFdmVudCwgRXJyb3JFdmVudCwgV2ViU29ja2V0Q29uc3RydWN0b3J9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIlxuXG5cbmludGVyZmFjZSBOZXRIYW5kbGUge1xuICBvbk1lc3NhZ2UodmFsdWU6IEFycmF5QnVmZmVyKTogdm9pZDtcblxuICBvbkNsb3NlKHJlc3VsdDogQ2xvc2VFdmVudCk6IHZvaWRcblxuICBvbkVycm9yPzogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgY2xhc3MgTmV0IHtcblxuICBwcml2YXRlIGNvbm46IENvbm5lY3Rpb24gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB3YWl0aW5nQ29ubmVjdDogQXJyYXk8KHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkPiA9IG5ldyBBcnJheTwocmV0OiBFcnJvciB8IG51bGwpID0+IHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3c3M6IHN0cmluZywgcHJpdmF0ZSBjb25uZWN0VGltZW91dDogRHVyYXRpb25cbiAgICAgICAgICAgICAgLCBwcml2YXRlIHdlYlNvY2tldENvbnN0cnVjdG9yOiBXZWJTb2NrZXRDb25zdHJ1Y3RvclxuICAgICAgICAgICAgICAsIHByaXZhdGUgaGFuZGxlOiBOZXRIYW5kbGUpIHtcbiAgfVxuXG4gIHByaXZhdGUgZG9XYWl0aW5nQ29ubmVjdChlcnI6IEVycm9yIHwgbnVsbCkge1xuICAgIGZvciAobGV0IHdhaXRpbmcgb2YgdGhpcy53YWl0aW5nQ29ubmVjdCkge1xuICAgICAgd2FpdGluZyhlcnIpXG4gICAgfVxuICAgIHRoaXMud2FpdGluZ0Nvbm5lY3QgPSBuZXcgQXJyYXk8KHJldDogRXJyb3IgfCBudWxsKSA9PiB2b2lkPigpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnZhbGlkV2Vic29ja2V0KCkge1xuICAgIHRoaXMuY29ubiEub25tZXNzYWdlID0gKCkgPT4ge31cbiAgICB0aGlzLmNvbm4hLm9ub3BlbiA9ICgpID0+IHt9XG4gICAgdGhpcy5jb25uIS5vbmNsb3NlID0gKCkgPT4ge31cbiAgICB0aGlzLmNvbm4hLm9uZXJyb3IgPSAoKSA9PiB7fVxuICAgIHRoaXMuY29ubiA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlV3NzKHdzczogc3RyaW5nKSB7XG4gICAgdGhpcy53c3MgPSB3c3NcbiAgfVxuXG4gIC8vIOmHh+eUqOacgOWkmuWPquacieS4gOadoei/nuaOpeWkhOS6jua0u+i3g+eKtuaAgeeahOetlueVpe+8iOWMheaLrO+8mmNvbm5lY3RpbmcvY29ubmVjdC9jbG9zaW5nKe+8jOi/nuaOpeeahOWIpOivu+WPr+S7peWNleS4gOWMlu+8jOWvueS4iuWxguaatOmcsueahOiwg+eUqOWPr+S7peeugOWNleWMluOAglxuICAvLyDkvYblr7nkuIDkupvmnoHpmZDmk43kvZzlj6/og73lhbfmnInmu57lkI7mgKfvvIzmr5TlpoLmraPlpITkuo5jbG9zaW5n55qE5pe25YCZKOS7o+eggeW8guatpeaJp+ihjOS4rSnvvIzmlrDnmoRDb25uZWN06LCD55So5LiN6IO956uL5Y2z6L+e5o6l44CC5Li65LqG5bC95Y+v6IO955qE6YG/5YWN6L+Z56eN5oOF5Ya177yMXG4gIC8vIOWcqG9uZXJyb3Ig5Y+KIG9uY2xvc2Ug5Lit6YO95L2/55So5LqG5ZCM5q2l5Luj56CB44CCXG4gIC8vIOWQjuacn+WmguaenOmHh+eUqOWkmuadoea0u+i3g+eKtuaAgeeahOetlueVpSjmr5TlpoLvvJrkuIDmnaFjbG9zaW5n77yM5LiA5p2hY29ubmVjdGluZynvvIzpnIDopoHogIPomZFuZXQuaGFuZGxl55qE5a6a5LmJ5Y+K5byC5q2l5oOF5Ya155qE5pe25bqP6Zeu6aKY44CCXG4gIHB1YmxpYyBhc3luYyBDb25uZWN0KCk6IFByb21pc2U8RXJyb3IgfCBudWxsPiB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxFcnJvciB8IG51bGw+KChyZXNvbHZlOiAocmV0OiBFcnJvciB8IG51bGwpID0+IHZvaWQpID0+IHtcbiAgICAgIHRoaXMud2FpdGluZ0Nvbm5lY3QucHVzaChyZXNvbHZlKTtcbiAgICAgIGlmICh0aGlzLmNvbm4gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAvLyBpbnZhbGlkIHRoaXMud2Vic29ja2V0XG4gICAgICAgIHRoaXMuaW52YWxpZFdlYnNvY2tldCgpXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG5ldyBFcnJvcihcImNvbm5lY3QgdGltZW91dFwiKSlcbiAgICAgIH0sIHRoaXMuY29ubmVjdFRpbWVvdXQvTWlsbGlzZWNvbmQpXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuY29ubiA9IG5ldyBDb25uZWN0aW9uKHRoaXMud3NzLCB0aGlzLndlYlNvY2tldENvbnN0cnVjdG9yKTtcbiAgICAgIH1jYXRjaCAoZSkge1xuICAgICAgICAvLyDnm67liY3op4LmtYvliLDvvJox44CB5aaC5p6cdXJs5YaZ6ZSZ77yM5YiZ5piv55u05o6l5ZyobmV35bCx5Lya5oqb5Ye65byC5bi477ybMuOAgeWmguaenOaYr+ecn+ato+eahOi/nuaOpeWksei0pe+8jOWImeS8muinpuWPkW9uZXJyb3LvvIzlkIzml7bov5jkvJrop6blj5FvbmNsb3NlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aGlzLmRvV2FpdGluZ0Nvbm5lY3QobmV3IEVycm9yKGUgYXMgc3RyaW5nKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSAocmVzdWx0OiBNZXNzYWdlRXZlbnQpPT57XG4gICAgICAgIHRoaXMuaGFuZGxlLm9uTWVzc2FnZShyZXN1bHQuZGF0YSlcbiAgICAgIH07XG4gICAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG51bGwpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gKHJlc3VsdDogQ2xvc2VFdmVudCkgPT4ge1xuICAgICAgICAvLyDmraTlpITlj6rogIPomZHov5jlpITkuo7ov57mjqXnmoTmg4XlhrXvvIzlhbbku5bmg4XlhrXlj6/ku6Xlj4Lop4Egb25lcnJvcueahOWkhOeQhlxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xvc2VFdmVudCA9IHtjb2RlOnJlc3VsdC5jb2RlLCByZWFzb246IHJlc3VsdC5yZWFzb259XG4gICAgICAgIGlmIChjbG9zZUV2ZW50LnJlYXNvbiA9PT0gXCJcIiB8fCBjbG9zZUV2ZW50LnJlYXNvbiA9PT0gdW5kZWZpbmVkIHx8IGNsb3NlRXZlbnQucmVhc29uID09PSBudWxsKSB7XG4gICAgICAgICAgY2xvc2VFdmVudC5yZWFzb24gPSBcInVua25vd25cIlxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcIm5ldC0tLW9uQ2xvc2VkLCBcIiwgSlNPTi5zdHJpbmdpZnkoY2xvc2VFdmVudCkpO1xuICAgICAgICB0aGlzLmhhbmRsZS5vbkNsb3NlKGNsb3NlRXZlbnQpO1xuICAgICAgICB0aGlzLmNvbm4/LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmNvbm4ub25lcnJvciA9IChyZXN1bHQ6IEVycm9yRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm5ldC0tLW9uRXJyb3JcIiwgcmVzdWx0KTtcbiAgICAgICAgLy8g6ZyA6KaB6ICD6JmR6L+e5o6l5aSx6LSl55qE6Ziy5b6h5oCn5Luj56CB77yMd2Vic29ja2V05o6l5Y+j5rKh5pyJ5piO56Gu5oyH5Ye66L+e5o6l5aSx6LSl55Sx5ZOq5Liq5o6l5Y+j6L+U5Zue77yM5pWF6L+Z6YeM5Yqg5LiK6L+e5o6l5aSx6LSl55qE5aSE55CGXG4gICAgICAgIC8vIOebruWJjeingua1i+WIsO+8mjHjgIHlpoLmnpx1cmzlhpnplJnvvIzliJnmmK/nm7TmjqXlnKhuZXflsLHkvJrmipvlh7rlvILluLjvvJsy44CB5aaC5p6c5piv55yf5q2j55qE6L+e5o6l5aSx6LSl77yM5YiZ5Lya6Kem5Y+Rb25lcnJvcu+8jOWQjOaXtui/mOS8muinpuWPkW9uY2xvc2VcblxuICAgICAgICAvLyDmsqHmnInlvIDlp4vov57mjqXmiJbogIXlhbbku5bku7vkvZXmg4XlhrXpgKDmiJB0aGlzLmNvbm7ooqvnva7kuLrnqbrvvIzpg73nm7TmjqXov5Tlm55cbiAgICAgICAgaWYgKHRoaXMuY29ubiA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5ZON5bqU5LqGb25lcnJvciDlsLHkuI3lho3lk43lupRvbmNsb3NlXG4gICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gKCk9Pnt9XG5cbiAgICAgICAgLy8g55uu5YmN5YGa5aaC5LiL55qE6K6+5a6a77ya5LiA5Liq5LiK5bGC55qEcGVuZGluZ+iwg+eUqCjov57mjqXmiJbogIXor7fmsYLnrYkp77yM6KaB5LmI5piv5Zyo562J5b6F6L+e5o6l5LitXG4gICAgICAgIC8vIOimgeS5iOaYr+WcqOetieW+hXJlc3BvbnNl5Lit44CC5Y2z5L2/5Ye6546w5byC5bi477yM5LiK5bGC5LiA6Iis5Y+v6IO96YO95pyJ6LaF5pe277yM5LuN5LiN5Lya5LiA55u06KKrcGVuZGluZ1xuICAgICAgICAvLyB0b2RvOiDmmK/lkKbkvJrmnInlkIzml7blh7rnjrDlnKgg562J6L+e5o6lIOS4jiDnrYnlk43lupQg5Lit77yfXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGhpcy5kb1dhaXRpbmdDb25uZWN0KG5ldyBFcnJvcihyZXN1bHQuZXJyTXNnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGUub25DbG9zZSh7Y29kZTogLTEsIHJlYXNvbjogXCJvbmVycm9yOiBcIiArIHJlc3VsdC5lcnJNc2d9KTtcbiAgICAgICAgICBpZiAodGhpcy5oYW5kbGUub25FcnJvcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUub25FcnJvcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29ubj8uY2xvc2UoKTtcbiAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBXcml0ZShkYXRhOiBBcnJheUJ1ZmZlcik6IEVycm9yIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuY29ubiA9PSBudWxsIHx8ICF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIm5vdCBjb25uZWN0ZWRcIilcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb25uLnNlbmQoZGF0YSlcbiAgfVxuXG4gIHB1YmxpYyBXcml0ZUZvcmNlKGRhdGE6IEFycmF5QnVmZmVyKSB7XG4gICAgdGhpcy5jb25uPy5TZW5kRm9yY2UoZGF0YSlcbiAgfVxuXG4gIHB1YmxpYyByZWNlaXZlZE9uZVJlc3BvbnNlKCk6dm9pZCB7XG4gICAgdGhpcy5jb25uPy5yZWNlaXZlZE9uZVJlc3BvbnNlKClcbiAgfVxuXG59IiwiaW1wb3J0IHtEdXJhdGlvbiwgU2Vjb25kfSBmcm9tIFwidHMteHV0aWxzXCJcbmltcG9ydCB7RHVtbXlXcywgV2ViU29ja2V0Q29uc3RydWN0b3J9IGZyb20gXCIuL2Nvbm5lY3Rpb25cIlxuXG5leHBvcnQgY2xhc3Mgb3B0aW9uIHtcbiAgcmVxdWVzdFRpbWVvdXQ6IER1cmF0aW9uID0gMzAqU2Vjb25kXG4gIGNvbm5lY3RUaW1lb3V0OiBEdXJhdGlvbiA9IDMwKlNlY29uZFxuICB3ZWJTb2NrZXRDb25zdHJ1Y3RvcjogV2ViU29ja2V0Q29uc3RydWN0b3IgPSBEdW1teVdzXG59XG5cbmV4cG9ydCB0eXBlIE9wdGlvbiA9IChvcCA6b3B0aW9uKT0+dm9pZDtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlcXVlc3RUaW1lb3V0KGQgOiBEdXJhdGlvbik6IE9wdGlvbiB7XG4gIHJldHVybiAob3AgOm9wdGlvbikgPT4ge1xuICAgIG9wLnJlcXVlc3RUaW1lb3V0ID0gZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25uZWN0VGltZW91dChkIDpEdXJhdGlvbik6IE9wdGlvbiB7XG4gIHJldHVybiAob3AgOm9wdGlvbikgPT4ge1xuICAgIG9wLmNvbm5lY3RUaW1lb3V0ID0gZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBXZWJTb2NrZXQod2ViU29ja2V0Q29uc3RydWN0b3I6IFdlYlNvY2tldENvbnN0cnVjdG9yKTogT3B0aW9uIHtcbiAgcmV0dXJuIChvcCA6b3B0aW9uKSA9PiB7XG4gICAgb3Aud2ViU29ja2V0Q29uc3RydWN0b3IgPSB3ZWJTb2NrZXRDb25zdHJ1Y3RvclxuICB9XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBVdGY4IHtcbiAgcHVibGljIHJlYWRvbmx5IHJhdzogVWludDhBcnJheTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmRleGVzOiBBcnJheTxudW1iZXI+O1xuICBwcml2YXRlIHN0cjpzdHJpbmd8bnVsbDtcbiAgcHVibGljIHJlYWRvbmx5IGJ5dGVMZW5ndGg6bnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgbGVuZ3RoOm51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihpbnB1dDogQXJyYXlCdWZmZXJ8c3RyaW5nKSB7XG4gICAgdGhpcy5pbmRleGVzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMucmF3ID0gbmV3IFVpbnQ4QXJyYXkoaW5wdXQpO1xuICAgICAgbGV0IHV0ZjhpID0gMDtcbiAgICAgIHdoaWxlICh1dGY4aSA8IHRoaXMucmF3Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmluZGV4ZXMucHVzaCh1dGY4aSk7XG4gICAgICAgIHV0ZjhpICs9IFV0ZjguZ2V0VVRGOENoYXJMZW5ndGgoVXRmOC5sb2FkVVRGOENoYXJDb2RlKHRoaXMucmF3LCB1dGY4aSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbmRleGVzLnB1c2godXRmOGkpOyAgLy8gZW5kIGZsYWdcblxuICAgICAgdGhpcy5zdHIgPSBudWxsO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RyID0gaW5wdXQ7XG5cbiAgICAgIGxldCBsZW5ndGggPSAwO1xuICAgICAgZm9yIChsZXQgY2ggb2YgaW5wdXQpIHtcbiAgICAgICAgbGVuZ3RoICs9IFV0ZjguZ2V0VVRGOENoYXJMZW5ndGgoY2guY29kZVBvaW50QXQoMCkhKVxuICAgICAgfVxuICAgICAgdGhpcy5yYXcgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuXG4gICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgZm9yIChsZXQgY2ggb2YgaW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICBpbmRleCA9IFV0ZjgucHV0VVRGOENoYXJDb2RlKHRoaXMucmF3LCBjaC5jb2RlUG9pbnRBdCgwKSEsIGluZGV4KVxuICAgICAgfVxuICAgICAgdGhpcy5pbmRleGVzLnB1c2goaW5kZXgpOyAvLyBlbmQgZmxhZ1xuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5pbmRleGVzLmxlbmd0aCAtIDE7XG4gICAgdGhpcy5ieXRlTGVuZ3RoID0gdGhpcy5yYXcuYnl0ZUxlbmd0aDtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbG9hZFVURjhDaGFyQ29kZShhQ2hhcnM6IFVpbnQ4QXJyYXksIG5JZHg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICBsZXQgbkxlbiA9IGFDaGFycy5sZW5ndGgsIG5QYXJ0ID0gYUNoYXJzW25JZHhdO1xuXG4gICAgcmV0dXJuIG5QYXJ0ID4gMjUxICYmIG5QYXJ0IDwgMjU0ICYmIG5JZHggKyA1IDwgbkxlbiA/XG4gICAgICAvKiAoblBhcnQgLSAyNTIgPDwgMzApIG1heSBiZSBub3Qgc2FmZSBpbiBFQ01BU2NyaXB0ISBTby4uLjogKi9cbiAgICAgIC8qIHNpeCBieXRlcyAqLyAoblBhcnQgLSAyNTIpICogMTA3Mzc0MTgyNCArIChhQ2hhcnNbbklkeCArIDFdIC0gMTI4IDw8IDI0KVxuICAgICAgKyAoYUNoYXJzW25JZHggKyAyXSAtIDEyOCA8PCAxOCkgKyAoYUNoYXJzW25JZHggKyAzXSAtIDEyOCA8PCAxMilcbiAgICAgICsgKGFDaGFyc1tuSWR4ICsgNF0gLSAxMjggPDwgNikgKyBhQ2hhcnNbbklkeCArIDVdIC0gMTI4XG4gICAgICA6IG5QYXJ0ID4gMjQ3ICYmIG5QYXJ0IDwgMjUyICYmIG5JZHggKyA0IDwgbkxlbiA/XG4gICAgICAgIC8qIGZpdmUgYnl0ZXMgKi8gKG5QYXJ0IC0gMjQ4IDw8IDI0KSArIChhQ2hhcnNbbklkeCArIDFdIC0gMTI4IDw8IDE4KVxuICAgICAgICArIChhQ2hhcnNbbklkeCArIDJdIC0gMTI4IDw8IDEyKSArIChhQ2hhcnNbbklkeCArIDNdIC0gMTI4IDw8IDYpXG4gICAgICAgICsgYUNoYXJzW25JZHggKyA0XSAtIDEyOFxuICAgICAgICA6IG5QYXJ0ID4gMjM5ICYmIG5QYXJ0IDwgMjQ4ICYmIG5JZHggKyAzIDwgbkxlbiA/XG4gICAgICAgICAgLyogZm91ciBieXRlcyAqLyhuUGFydCAtIDI0MCA8PCAxOCkgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCAxMilcbiAgICAgICAgICArIChhQ2hhcnNbbklkeCArIDJdIC0gMTI4IDw8IDYpICsgYUNoYXJzW25JZHggKyAzXSAtIDEyOFxuICAgICAgICAgIDogblBhcnQgPiAyMjMgJiYgblBhcnQgPCAyNDAgJiYgbklkeCArIDIgPCBuTGVuID9cbiAgICAgICAgICAgIC8qIHRocmVlIGJ5dGVzICovIChuUGFydCAtIDIyNCA8PCAxMikgKyAoYUNoYXJzW25JZHggKyAxXSAtIDEyOCA8PCA2KVxuICAgICAgICAgICAgKyBhQ2hhcnNbbklkeCArIDJdIC0gMTI4XG4gICAgICAgICAgICA6IG5QYXJ0ID4gMTkxICYmIG5QYXJ0IDwgMjI0ICYmIG5JZHggKyAxIDwgbkxlbiA/XG4gICAgICAgICAgICAgIC8qIHR3byBieXRlcyAqLyAoblBhcnQgLSAxOTIgPDwgNikgKyBhQ2hhcnNbbklkeCArIDFdIC0gMTI4XG4gICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgLyogb25lIGJ5dGUgKi8gblBhcnQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBwdXRVVEY4Q2hhckNvZGUoYVRhcmdldDogVWludDhBcnJheSwgbkNoYXI6IG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBuUHV0QXQ6IG51bWJlcik6bnVtYmVyIHtcblxuICAgIGxldCBuSWR4ID0gblB1dEF0O1xuXG4gICAgaWYgKG5DaGFyIDwgMHg4MCAvKiAxMjggKi8pIHtcbiAgICAgIC8qIG9uZSBieXRlICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSBuQ2hhcjtcbiAgICB9IGVsc2UgaWYgKG5DaGFyIDwgMHg4MDAgLyogMjA0OCAqLykge1xuICAgICAgLyogdHdvIGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGMwIC8qIDE5MiAqLyArIChuQ2hhciA+Pj4gNik7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH0gZWxzZSBpZiAobkNoYXIgPCAweDEwMDAwIC8qIDY1NTM2ICovKSB7XG4gICAgICAvKiB0aHJlZSBieXRlcyAqL1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHhlMCAvKiAyMjQgKi8gKyAobkNoYXIgPj4+IDEyKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gNikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKG5DaGFyICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgfSBlbHNlIGlmIChuQ2hhciA8IDB4MjAwMDAwIC8qIDIwOTcxNTIgKi8pIHtcbiAgICAgIC8qIGZvdXIgYnl0ZXMgKi9cbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ZjAgLyogMjQwICovICsgKG5DaGFyID4+PiAxOCk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDEyKSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiA2KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAobkNoYXIgJiAweDNmIC8qIDYzICovKTtcbiAgICB9IGVsc2UgaWYgKG5DaGFyIDwgMHg0MDAwMDAwIC8qIDY3MTA4ODY0ICovKSB7XG4gICAgICAvKiBmaXZlIGJ5dGVzICovXG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweGY4IC8qIDI0OCAqLyArIChuQ2hhciA+Pj4gMjQpO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxOCkgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMTIpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDYpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArIChuQ2hhciAmIDB4M2YgLyogNjMgKi8pO1xuICAgIH0gZWxzZSAvKiBpZiAobkNoYXIgPD0gMHg3ZmZmZmZmZikgKi8geyAvKiAyMTQ3NDgzNjQ3ICovXG4gICAgICAvKiBzaXggYnl0ZXMgKi9cbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ZmMgLyogMjUyICovICsgLyogKG5DaGFyID4+PiAzMCkgbWF5IGJlIG5vdCBzYWZlIGluIEVDTUFTY3JpcHQhIFNvLi4uOiAqLyAobkNoYXIgLyAxMDczNzQxODI0KTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gMjQpICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgICBhVGFyZ2V0W25JZHgrK10gPSAweDgwIC8qIDEyOCAqLyArICgobkNoYXIgPj4+IDE4KSAmIDB4M2YgLyogNjMgKi8pO1xuICAgICAgYVRhcmdldFtuSWR4KytdID0gMHg4MCAvKiAxMjggKi8gKyAoKG5DaGFyID4+PiAxMikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKChuQ2hhciA+Pj4gNikgJiAweDNmIC8qIDYzICovKTtcbiAgICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4ODAgLyogMTI4ICovICsgKG5DaGFyICYgMHgzZiAvKiA2MyAqLyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5JZHg7XG5cbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyBnZXRVVEY4Q2hhckxlbmd0aChuQ2hhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbkNoYXIgPCAweDgwID8gMSA6IG5DaGFyIDwgMHg4MDAgPyAyIDogbkNoYXIgPCAweDEwMDAwXG4gICAgICA/IDMgOiBuQ2hhciA8IDB4MjAwMDAwID8gNCA6IG5DaGFyIDwgMHg0MDAwMDAwID8gNSA6IDY7XG4gIH1cblxuXG4gIC8vIHByaXZhdGUgc3RhdGljIGxvYWRVVEYxNkNoYXJDb2RlKGFDaGFyczogVWludDE2QXJyYXksIG5JZHg6IG51bWJlcik6IG51bWJlciB7XG4gIC8vXG4gIC8vICAgLyogVVRGLTE2IHRvIERPTVN0cmluZyBkZWNvZGluZyBhbGdvcml0aG0gKi9cbiAgLy8gICBsZXQgbkZyc3RDaHIgPSBhQ2hhcnNbbklkeF07XG4gIC8vXG4gIC8vICAgcmV0dXJuIG5GcnN0Q2hyID4gMHhEN0JGIC8qIDU1MjMxICovICYmIG5JZHggKyAxIDwgYUNoYXJzLmxlbmd0aCA/XG4gIC8vICAgICAobkZyc3RDaHIgLSAweEQ4MDAgLyogNTUyOTYgKi8gPDwgMTApICsgYUNoYXJzW25JZHggKyAxXSArIDB4MjQwMCAvKiA5MjE2ICovXG4gIC8vICAgICA6IG5GcnN0Q2hyO1xuICAvLyB9XG4gIC8vXG4gIC8vIHByaXZhdGUgc3RhdGljIHB1dFVURjE2Q2hhckNvZGUoYVRhcmdldDogVWludDE2QXJyYXksIG5DaGFyOiBudW1iZXIsIG5QdXRBdDogbnVtYmVyKTpudW1iZXIge1xuICAvL1xuICAvLyAgIGxldCBuSWR4ID0gblB1dEF0O1xuICAvL1xuICAvLyAgIGlmIChuQ2hhciA8IDB4MTAwMDAgLyogNjU1MzYgKi8pIHtcbiAgLy8gICAgIC8qIG9uZSBlbGVtZW50ICovXG4gIC8vICAgICBhVGFyZ2V0W25JZHgrK10gPSBuQ2hhcjtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgLyogdHdvIGVsZW1lbnRzICovXG4gIC8vICAgICBhVGFyZ2V0W25JZHgrK10gPSAweEQ3QzAgLyogNTUyMzIgKi8gKyAobkNoYXIgPj4+IDEwKTtcbiAgLy8gICAgIGFUYXJnZXRbbklkeCsrXSA9IDB4REMwMCAvKiA1NjMyMCAqLyArIChuQ2hhciAmIDB4M0ZGIC8qIDEwMjMgKi8pO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICByZXR1cm4gbklkeDtcbiAgLy8gfVxuICAvL1xuICAvLyBwcml2YXRlIHN0YXRpYyBnZXRVVEYxNkNoYXJMZW5ndGgobkNoYXI6IG51bWJlcik6IG51bWJlciB7XG4gIC8vICAgcmV0dXJuIG5DaGFyIDwgMHgxMDAwMCA/IDEgOiAyO1xuICAvLyB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6c3RyaW5nIHtcbiAgICBpZiAodGhpcy5zdHIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyXG4gICAgfVxuXG4gICAgbGV0IGNvZGVzID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICBmb3IgKGxldCB1dGY4aSA9IDA7IHV0ZjhpIDwgdGhpcy5yYXcubGVuZ3RoOykge1xuICAgICAgbGV0IGNvZGUgPSBVdGY4LmxvYWRVVEY4Q2hhckNvZGUodGhpcy5yYXcsIHV0ZjhpKTtcbiAgICAgIGNvZGVzLnB1c2goY29kZSk7XG4gICAgICB1dGY4aSArPSBVdGY4LmdldFVURjhDaGFyTGVuZ3RoKGNvZGUpO1xuICAgIH1cblxuICAgIHRoaXMuc3RyID0gU3RyaW5nLmZyb21Db2RlUG9pbnQoLi4uY29kZXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RyO1xuICB9XG5cbiAgcHVibGljIGNvZGVQb2ludEF0KGluZGV4OiBudW1iZXIpOkFycmF5QnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5yYXcuc2xpY2UodGhpcy5pbmRleGVzW2luZGV4XSwgdGhpcy5pbmRleGVzW2luZGV4KzFdKTtcbiAgfVxuXG59XG5cblxuIiwiXG5pbXBvcnQge0NsaWVudCwgV2ViU29ja2V0LCBPcHRpb259IGZyb20gXCJ0cy1zdHJlYW1jbGllbnQtYmFzZVwiXG5pbXBvcnQge0RvbVdlYlNvY2tldH0gZnJvbSBcIi4vc3JjL3dlYnNvY2tldFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBOZXdDbGllbnQod3NzOiBzdHJpbmcsIC4uLm9wZjogT3B0aW9uW10pOiBDbGllbnQge1xuICBvcGYucHVzaChXZWJTb2NrZXQoRG9tV2ViU29ja2V0KSlcbiAgcmV0dXJuIG5ldyBDbGllbnQod3NzLCAuLi5vcGYpXG59XG4iLCJpbXBvcnQge0Nsb3NlRXZlbnQsIE1lc3NhZ2VFdmVudCwgRXZlbnQsIFdlYlNvY2tldEludGVyZmFjZSwgRXJyb3JFdmVudH0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1iYXNlXCJcblxuXG5leHBvcnQgY2xhc3MgRG9tV2ViU29ja2V0IGltcGxlbWVudHMgV2ViU29ja2V0SW50ZXJmYWNle1xuXG4gIG9uY2xvc2U6ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogQ2xvc2VFdmVudCkgPT4gYW55KSA9ICgpPT57fVxuICBvbmVycm9yOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IEVycm9yRXZlbnQpID0+IGFueSkgPSAoKT0+e31cbiAgb25tZXNzYWdlOiAoKHRoaXM6IFdlYlNvY2tldEludGVyZmFjZSwgZXY6IE1lc3NhZ2VFdmVudCkgPT4gYW55KSA9ICgpPT57fVxuICBvbm9wZW46ICgodGhpczogV2ViU29ja2V0SW50ZXJmYWNlLCBldjogRXZlbnQpID0+IGFueSkgPSAoKT0+e31cblxuICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0O1xuXG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybClcbiAgICB0aGlzLndlYnNvY2tldC5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy53ZWJzb2NrZXQub25jbG9zZSA9IChldjogQ2xvc2VFdmVudCk9PntcbiAgICAgIGNvbnNvbGUud2FybihcIkRvbVdlYlNvY2tldC0tLW9uY2xvc2VcIilcbiAgICAgIHRoaXMub25jbG9zZShldilcbiAgICB9XG4gICAgdGhpcy53ZWJzb2NrZXQub25lcnJvciA9IChldjogRXZlbnQpPT57XG4gICAgICBjb25zb2xlLmVycm9yKFwiRG9tV2ViU29ja2V0LS0tb25lcnJvclwiKVxuICAgICAgdGhpcy5vbmVycm9yKHtlcnJNc2c6IFwiRG9tV2ViU29ja2V0OiBvbmVycm9yLiBcIiArIGV2LnRvU3RyaW5nKCl9KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudCk9PntcbiAgICAgIHRoaXMub25tZXNzYWdlKGV2KVxuICAgIH1cbiAgICB0aGlzLndlYnNvY2tldC5vbm9wZW4gPSAoZXY6IEV2ZW50KT0+e1xuICAgICAgdGhpcy5vbm9wZW4oZXYpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKGNvZGU/OiBudW1iZXIsIHJlYXNvbj86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKGNvZGUsIHJlYXNvbilcbiAgfVxuXG4gIHNlbmQoZGF0YTogQXJyYXlCdWZmZXIpOiB2b2lkIHtcbiAgICB0aGlzLndlYnNvY2tldC5zZW5kKGRhdGEpXG4gIH1cblxufSIsIlxuZXhwb3J0IHtEdXJhdGlvbiwgSG91ciwgU2Vjb25kLCBNaW51dGUsIE1pY3Jvc2Vjb25kLCBNaWxsaXNlY29uZH0gZnJvbSBcIi4vc3JjL2R1cmF0aW9uXCJcblxuXG4iLCJcblxuZXhwb3J0IHR5cGUgRHVyYXRpb24gPSBudW1iZXJcblxuZXhwb3J0IGNvbnN0IE1pY3Jvc2Vjb25kID0gMVxuZXhwb3J0IGNvbnN0IE1pbGxpc2Vjb25kID0gMTAwMCAqIE1pY3Jvc2Vjb25kXG5leHBvcnQgY29uc3QgU2Vjb25kID0gMTAwMCAqIE1pbGxpc2Vjb25kXG5leHBvcnQgY29uc3QgTWludXRlID0gNjAgKiBTZWNvbmRcbmV4cG9ydCBjb25zdCBIb3VyID0gNjAgKiBNaW51dGUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBjbGllbnQ6IENsaWVudFxuaW1wb3J0IHtDbGllbnQsIENvbm5FcnJvcn0gZnJvbSBcInRzLXN0cmVhbWNsaWVudC1iYXNlXCJcbmltcG9ydCB7TmV3Q2xpZW50fSBmcm9tIFwidHMtc3RyZWFtY2xpZW50LWJyb3dzZXJcIlxuXG5cbmxldCBjbGllbnQ6IENsaWVudHxudWxsID0gbnVsbFxubGV0IHVybCA9IFwiXCJcblxuZnVuY3Rpb24gaGVhZGVycyhjYWNoZTogQ2FjaGUpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcbiAgbGV0IHJldDpNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpXG4gIGxldCBrZXk6IHN0cmluZyA9IFwiXCJcblxuICBrZXkgPSAoJChcIiNrZXkxXCIpLnZhbCgpIGFzIHN0cmluZykudHJpbSgpXG4gIGlmIChrZXkgIT09IFwiXCIpIHtcbiAgICBjYWNoZS5rZXkxID0ga2V5XG4gICAgY2FjaGUudmFsdWUxID0gKCQoXCIjdmFsdWUxXCIpLnZhbCgpIGFzIHN0cmluZykudHJpbSgpXG4gICAgcmV0LnNldChrZXksIGNhY2hlLnZhbHVlMSlcbiAgfSBlbHNlIHtcbiAgICBjYWNoZS5rZXkxID0gXCJcIlxuICAgIGNhY2hlLnZhbHVlMSA9IFwiXCJcbiAgfVxuXG4gIGtleSA9ICgkKFwiI2tleTJcIikudmFsKCkgYXMgc3RyaW5nKS50cmltKClcbiAgaWYgKGtleSAhPT0gXCJcIikge1xuICAgIGNhY2hlLmtleTIgPSBrZXlcbiAgICBjYWNoZS52YWx1ZTIgPSAoJChcIiN2YWx1ZTJcIikudmFsKCkgYXMgc3RyaW5nKS50cmltKClcbiAgICByZXQuc2V0KGtleSwgY2FjaGUudmFsdWUyKVxuICB9IGVsc2Uge1xuICAgIGNhY2hlLmtleTIgPSBcIlwiXG4gICAgY2FjaGUudmFsdWUyID0gXCJcIlxuICB9XG5cbiAga2V5ID0gKCQoXCIja2V5M1wiKS52YWwoKSBhcyBzdHJpbmcpLnRyaW0oKVxuICBpZiAoa2V5ICE9PSBcIlwiKSB7XG4gICAgY2FjaGUua2V5MyA9IGtleVxuICAgIGNhY2hlLnZhbHVlMyA9ICgkKFwiI3ZhbHVlM1wiKS52YWwoKSBhcyBzdHJpbmcpLnRyaW0oKVxuICAgIHJldC5zZXQoa2V5LCBjYWNoZS52YWx1ZTMpXG4gIH0gZWxzZSB7XG4gICAgY2FjaGUua2V5MyA9IFwiXCJcbiAgICBjYWNoZS52YWx1ZTMgPSBcIlwiXG4gIH1cblxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIHByaW50KHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCBib2R5ID0gJCgnYm9keScpO1xuICBib2R5LmFwcGVuZChcIjxwPlwiK3N0cmluZytcIjwvcD5cIik7XG59XG5mdW5jdGlvbiBwcmludFB1c2goc3RyaW5nOiBzdHJpbmcpIHtcbiAgbGV0IGJvZHkgPSAkKCdib2R5Jyk7XG4gIGJvZHkuYXBwZW5kKFwiPHAgc3R5bGU9J2NvbG9yOiBjYWRldGJsdWUnPlwiK3N0cmluZytcIjwvcD5cIik7XG59XG5mdW5jdGlvbiBwcmludEVycm9yKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCBib2R5ID0gJCgnYm9keScpO1xuICBib2R5LmFwcGVuZChcIjxwIHN0eWxlPSdjb2xvcjogcmVkJz5cIitzdHJpbmcrXCI8L3A+XCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZCgpIHtcbiAgbGV0IHdzcyA9ICQoXCIjd3NzXCIpLnZhbCgpXG4gIGlmIChjbGllbnQgPT09IG51bGwgfHwgdXJsICE9IHdzcykge1xuICAgIHVybCA9IHdzcyBhcyBzdHJpbmdcbiAgICBjbGllbnQgPSBOZXdDbGllbnQodXJsKVxuICAgIGNsaWVudC5zZXRQdXNoQ2FsbGJhY2soKGRhdGEpPT57XG4gICAgICBwcmludFB1c2goXCJwdXNoOiBcIiArIGRhdGEudG9TdHJpbmcoKSlcbiAgICB9KVxuICAgIGNsaWVudC5zZXRQZWVyQ2xvc2VkQ2FsbGJhY2soKCk9PntcbiAgICAgIHByaW50RXJyb3IoXCJjb25uOiBjbG9zZWQgYnkgcGVlclwiKVxuICAgIH0pXG4gIH1cblxuICBsZXQgY2FjaGUgPSBuZXcgQ2FjaGUoKVxuICBjYWNoZS53c3MgPSB1cmxcblxuICBjYWNoZS5kYXRhID0gJChcIiNwb3N0XCIpLnZhbCgpIGFzIHN0cmluZ1xuXG4gIGxldCBbcmV0LCBlcnJdID0gYXdhaXQgY2xpZW50LnNlbmQoY2FjaGUuZGF0YSwgaGVhZGVycyhjYWNoZSkpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFzdFwiLCBKU09OLnN0cmluZ2lmeShjYWNoZSkpXG5cbiAgaWYgKGVyciAhPT0gbnVsbCkge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBDb25uRXJyb3IpIHtcbiAgICAgIGNsaWVudCA9IG51bGxcbiAgICAgIHByaW50RXJyb3IoXCJjb25uLWVycm9yOiBcIiArIGVyci5tZXNzYWdlKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcmludEVycm9yKFwicmVzcC1lcnJvcjogXCIgKyBlcnIubWVzc2FnZSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcHJpbnQoXCJyZXNwOiBcIiArIHJldC50b1N0cmluZygpICsgXCJcXG4gLS0tPiBqc29uOiBcIiArIEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2UocmV0LnRvU3RyaW5nKCkpKSlcbiAgICBjb25zb2xlLmxvZyhcInJlc3AtLS1qc29uOiBcIilcbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHJldC50b1N0cmluZygpKSlcbiAgfVxufVxuXG4kKFwiI3NlbmRcIikub24oXCJjbGlja1wiLCBhc3luYyAoKT0+e1xuICBhd2FpdCBzZW5kKClcbn0pXG5cbmNsYXNzIENhY2hlIHtcbiAgd3NzOiBzdHJpbmcgPSBcIlwiXG4gIGtleTE6IHN0cmluZyA9IFwiXCJcbiAgdmFsdWUxOiBzdHJpbmcgPSBcIlwiXG4gIGtleTI6IHN0cmluZyA9IFwiXCJcbiAgdmFsdWUyOiBzdHJpbmcgPSBcIlwiXG4gIGtleTM6IHN0cmluZyA9IFwiXCJcbiAgdmFsdWUzOiBzdHJpbmcgPSBcIlwiXG4gIGRhdGE6IHN0cmluZyA9IFwiXCJcbn1cblxuJCgoKT0+e1xuICBsZXQgY2FjaGVTID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYXN0XCIpXG4gIGxldCBjYWNoZTogQ2FjaGVcbiAgaWYgKGNhY2hlUyA9PT0gbnVsbCkge1xuICAgIGNhY2hlID0gbmV3IENhY2hlKClcbiAgfSBlbHNlIHtcbiAgICBjYWNoZSA9IEpTT04ucGFyc2UoY2FjaGVTKSBhcyBDYWNoZVxuICB9XG5cbiAgJChcIiNrZXkxXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS5rZXkxKVxuICAkKFwiI3ZhbHVlMVwiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUudmFsdWUxKVxuICAkKFwiI2tleTJcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLmtleTIpXG4gICQoXCIjdmFsdWUyXCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS52YWx1ZTIpXG4gICQoXCIja2V5M1wiKS5hdHRyKFwidmFsdWVcIiwgY2FjaGUua2V5MylcbiAgJChcIiN2YWx1ZTNcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLnZhbHVlMylcbiAgJChcIiN3c3NcIikuYXR0cihcInZhbHVlXCIsIGNhY2hlLndzcylcbiAgJChcIiNwb3N0XCIpLmF0dHIoXCJ2YWx1ZVwiLCBjYWNoZS5kYXRhKVxufSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==