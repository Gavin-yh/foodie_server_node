class BaseModel {
    constructor (data, message) {
        //第一个对象 第二个字符串 兼容：当第一个就是传字符串，则直接让message等于data
        if (typeof data === "string") {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class successModel extends BaseModel {
    constructor (data, message) {
        super (data, message)
        this.statu = 0
    }
}

class errorModel extends BaseModel {
    constructor (data, message) {
        super (data, message)
        this.statu = -1
    }
}

module.exports = {
    successModel,
    errorModel
}