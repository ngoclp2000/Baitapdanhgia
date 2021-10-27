class Common{
    static cloneArray(source){
        let res = []
        for(let i = 0 ; i < source.length ; i++){
            res.push(source[i]);
        }
        return res;
    }
}

export default Common;