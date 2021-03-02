class Ds{
    app;
    data;

    events = [
        {
            attr:"d-click",
            trigger:"click"
        },
        {
            attr:"d-mouseover",
            trigger:"mouseover"
        }
    ];

    render(selector, arg){
        this.app = document.getElementById(selector);
        this.data = arg.data;
        this.events.forEach(ev => {
            var el = this.app.querySelectorAll('*['+ev.attr+']');
            el.forEach(element => {
                var attrClick = element.attributes[ev.attr];
                var attrValue = attrClick.nodeValue;
                var attrValueClean = attrValue.substring(1,attrValue.length-1);
                var elData = this.data;
                elData.me = element;
                element.addEventListener(ev.trigger, arg.event[attrValueClean].bind(this.data))
            });
        });
    }
}