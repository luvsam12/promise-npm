// defining multiple states for a promise
const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}


class MyPromise {
    
    constructor(cb) {
        this.thenCbs = [] //since multiple calbacks cas be passed byy calling multiple .then to the same promise variable
        this.catchCbs = [] //ditto
        this.state = STATE.PENDING // initial state of the promise
        this.value = ''
        try {
            cb(this.onSuccess.bind(this), this.onFail.bind(this))  // binding the state of the obj.
        } catch (error) {
            this.onFail(error)
        }
    }



    onSuccess(value) {
        if(this.state !== STATE.PENDING) return // if the promise is already resolved then return
        this.value = value
        this.state = STATE.FULFILLED
        this.runCallbacks()
    }

    onFail(value) {
        if(this.state !== STATE.PENDING) return
        this.value = value
        this.state = STATE.REJECTED
        this.runCallbacks()
    }

    runCallbacks() {
        if(this.state === STATE.FULFILLED) { 
            this.thenCbs.forEach(callback => {
                callback(this.value)
            })
            this.thenCbs = []
        }

        if(this.state === STATE.REJECTED) {
            this.catchCbs.forEach(callback => {
                callback(this.value)
            })
            this.catchCbs = []
        }

        if(this.state === STATE.PENDING) {
            
        }
    }

    then(thenCb, catchCb) {
        if(thenCb != null) this.thenCbs.push(thenCb)
        if(catchCb != null) this.catchCbs.push(catchCb)
        this.runCallbacks()
    }

    catch (cb) {
        this.then(undefined, cb)
    }

    finally(cb) {

    }

}



module.exports = MyPromise