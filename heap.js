export{ heap }

class heap
{ 
     
    arr = [];
    size(){
      return this.arr.length  ;
    }
    insert(val) {


            let idx = this.arr.length ; 
            this.arr.push(val);
            let par_idx = Math.floor( (idx - 1 ) / 2 );

            while(idx != 0 && ( this.arr[idx][1] > this.arr[par_idx][1] )) 
            { 
                let tmp = this.arr[par_idx] ;
                this.arr[par_idx] = this.arr[idx] ;
                this.arr[idx] = tmp ;
                idx = par_idx ;
                par_idx = Math.floor( (par_idx - 1 )/ 2) ;
            }
    }
    extractMPop()  {
          let ans = this.arr[0] ;
          let tmp = this.arr.pop();

          if(this.arr.length){
             
             this.arr[0] = tmp; 
             this.heapfy(0) ;
          }
          return ans ;
    }

    heapfy(idx){
        let left = 2 *idx + 1 ;
        let right = 2 *idx + 2 ;

        let small = idx ;

        if(left < this.arr.length  && this.arr[left][1] > this.arr[small][1]) 
          small = left ;
        if(right< this.arr.length  && this.arr[right][1] > this.arr[small][1]) 
          small = right ;

        if(small != idx)  {

            let tmp = this.arr[idx] ;
            this.arr[idx] = this.arr[small] ;
            this.arr[small] = tmp ;
            this.heapfy(small) ;
        }
    }
} ;

