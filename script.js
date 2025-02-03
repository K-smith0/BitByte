const CAN = document.querySelector("canvas");
const ctx = CAN.getContext("2d");
const deltaTime = 16/1000;
let inputs = {w:false,a:false,s:false,d:false};
ctx.strokeStyle="green";
ctx.lineWidth=7;
class player{
    constructor(pos){
        this.position={x:pos.x,y:pos.y,dx:0,dy:0,ddx:0,ddy:0}
        this.grounded=true;
    }
    debugDraw(){
        ctx.translate(500-this.position.x,500-this.position.y);
        ctx.beginPath();
        ctx.rect(this.position.x,this.position.y,15,-30);
        ctx.rect(this.position.x,this.position.y,-15,-30);
        ctx.rect(this.position.x,this.position.y,-15,30);
        ctx.rect(this.position.x,this.position.y,15,30);
        ctx.rect(this.position.x-5,this.position.y-5,10,10);
        ctx.rect(500,500,20,20);
        ctx.stroke();
        ctx.closePath();
        ctx.resetTransform();
    }
    /*  
    this.position.ddy=(this.position.ddy+10>10)?10:(this.position.ddy<10)?this.position.ddy+10:0;
    this.position.dx=this.position.dx*0.9+this.position.ddx;
    this.position.dy=this.position.dy*0.9+this.position.ddy;
    this.position.x=(this.position.x+this.position.dx<0)?0:(this.position.x+this.position.dx>970)?970:this.position.x+this.position.dx;
    this.position.y=(this.position.y+this.position.dy>1000)?1000:this.position.y+this.position.dy;
    this.debugDraw(); 
    */
    debugUpdateInput(){
        if(inputs.w && this.grounded){
            this.position.ddy-=30;
            this.grounded=false;
        }
        if(inputs.a)this.position.ddx=(this.position.ddx=-1)?-2:this.position.ddx-1*deltaTime;
        if(inputs.d)this.position.ddx=(this.position.ddx=1)?2:this.position.ddx+1*deltaTime;
        this.position.ddy=(this.position.ddy+100>100)?100*deltaTime:(this.position.ddy<100)?this.position.ddy+100*deltaTime:0;


    }
    debugUpdatePosition(){
        this.position.dx=this.position.dx*0.9+this.position.ddx;
        this.position.dy=this.position.dy*0.9+this.position.ddy;
        this.position.x=(this.position.x+this.position.dx<15)?15:(this.position.x+this.position.dx>985)?985:this.position.x+this.position.dx;
        this.position.y=(this.position.y+this.position.dy>970)?970:this.position.y+this.position.dy;
        this.position.dy=(this.position.y==970)?0:this.position.dy;
        this.position.dx=(this.position.x==15 || this.position.x==985)?0:this.position.dx;
        if(this.position.y==970)this.grounded=true;
        this.position.ddy=0;
        this.position.ddx=0;
    }
    debugUpdate(){
        //console.clear();
        //console.log(this.position.ddx,this.position.ddy,this.position.dx,this.position.dy,this.position.x,this.position.y);
        this.debugUpdateInput();
        this.debugUpdatePosition();
        this.debugDraw();
        
    }

}
let p = new player({x:500,y:500});

document.onkeydown= (e) => inputs[`${e.key.toLowerCase()}`]=true;

document.onkeyup= (e) => inputs[`${e.key.toLowerCase()}`]=false; 


setInterval(x => {
    ctx.clearRect(0,0,1000,1000);
    p.debugUpdate();
},16);