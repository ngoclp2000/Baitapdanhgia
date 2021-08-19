
class DatePicker{
    constructor(){
        this.loop = null;
    }
    static runLoop(){
        this.loop = setInterval(()=>{
            document.querySelectorAll('.vdpClearInput').forEach(element=>{
                element.setAttribute("tabIndex", "-1");
            })
            if(document.querySelectorAll('.vdpInnerWrap *').length != 0){
                document.querySelectorAll('.vdpInnerWrap *').forEach(element=>{
                    element.setAttribute("tabIndex", "-1");
                })
            }
        },10);
    }
    static stopLoop(){
        clearInterval(this.loop);
    }
}

export default DatePicker;