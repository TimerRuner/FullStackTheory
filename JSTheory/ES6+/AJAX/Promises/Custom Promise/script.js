function noop() {}

class VadymPromise {
  constructor(execute){
    this.queue = [];
    this.errorHandler = noop;
    this.finallyHandler = noop;

    try {
      execute(this.onResolve.bind(this), this.onReject.bind(this));
    } catch (error) {
      this.errorHandler(error);
    } finally {
      this.finallyHandler();
    }
  }

  onResolve(data){
    this.queue.forEach(cb => {
      data = cb(data);
    });

    this.finallyHandler();
  }

  onReject(err){
    this.errorHandler(err);
    this.finallyHandler();
  }

  then(fn){
    this.queue.push(fn);
    return this;
  }

  catch(fn){
    this.errorHandler = fn;
    return this;
  }

  finally(fn){
    this.finallyHandler = fn;
    return this;
  }
}

const pr = new VadymPromise((resolve, reject) => {
  setTimeout(function(){
    resolve("It's me Error!");
  }, 300);

});

pr
  .then(data => data.toUpperCase())
  .then(upperStr => console.log(upperStr.length, upperStr))
  .catch(err => console.log(err))
  .finally(() => console.log('finally'));