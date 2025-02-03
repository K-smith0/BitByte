const CAN = document.querySelector("canvas");
const ctx = CAN.getContext("2d");
const deltaTime = 16/1000;
let inputs = {w:false,a:false,s:false,d:false};
ctx.strokeStyle="green";
ctx.lineWidth=7;
class player{
    h=30;
    w=15;
    constructor(pos){
        this.position={x:pos.x,y:pos.y,dx:0,dy:0,ddx:0,ddy:0}
        this.grounded=true;
    }
    debugDraw(){
        ctx.translate(500-this.position.x,500-this.position.y);
        ctx.beginPath();
        ctx.rect(this.position.x,this.position.y,this.w,-this.h);
        ctx.rect(this.position.x,this.position.y,-this.w,-this.h);
        ctx.rect(this.position.x,this.position.y,-this.w,this.h);
        ctx.rect(this.position.x,this.position.y,this.w,this.h);
        ctx.rect(this.position.x-5,this.position.y-5,10,10);
        ctx.stroke();
        ctx.closePath();
        ctx.resetTransform();
    }
    debugUpdateInput(){
        if(inputs.w && this.grounded){
            this.position.ddy-=30;
            this.grounded=false;
        }
        if(inputs.a)this.position.ddx=(this.position.ddx=-1)?-2:this.position.ddx-1*deltaTime;
        if(inputs.d)this.position.ddx=(this.position.ddx=1)?2:this.position.ddx+1*deltaTime;
        this.position.ddy=(this.position.ddy+100>100)?100*deltaTime:(this.position.ddy<100)?this.position.ddy+100*deltaTime:0;
        if(inputs.s){this.h=15; this.position.y+15;}
        else {this.h=30;this.position-15;}

    }
    debugUpdatePosition(){
        this.position.dx=this.position.dx*0.9+this.position.ddx;
        this.position.dy=this.position.dy*0.9+this.position.ddy;
        this.position.x=this.position.x+this.position.dx;
        //this.position.y=(this.position.y+this.position.dy>1000-this.h)?1000-this.h:this.position.y+this.position.dy;
        this.position.dy=(this.position.y==1000-this.h)?0:this.position.dy;
        this.position.dx=(this.position.x==this.w || this.position.x==1000-this.w)?0:this.position.dx;
        //if(this.position.y==1000-this.h)this.grounded=true;
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
class map{
    map=[];
    constructor(){
        for (let i = 1; i <= 100; i++) for (let j = 1; j <= 100; j++) this.map.push({x:i,y:j,solid:(Math.random()>0.7)});
    }
    debugDraw(){
        ctx.translate(500-p.position.x,500-p.position.y);
        this.map.filter(x => ((p.position.x/50)-10<x.x && (p.position.x/50)+10>x.x && (p.position.y/50)-10<x.y && (p.position.y/50)+10>x.y )).forEach(x => {
            if(x.solid){
            ctx.beginPath();
            ctx.strokeStyle="blue";
            ctx.rect(x.x*50,x.y*50,25,-25);
            ctx.rect(x.x*50,x.y*50,-25,-25);
            ctx.rect(x.x*50,x.y*50,-25,25);
            ctx.rect(x.x*50,x.y*50,25,25);
            ctx.stroke();
            ctx.strokeStyle="green";
            ctx.closePath();
        }
        });
        ctx.resetTransform();
    }
}
let p = new player({x:500,y:500});
let Mapper = new map();

document.onkeydown= (e) => inputs[`${e.key.toLowerCase()}`]=true;

document.onkeyup= (e) => inputs[`${e.key.toLowerCase()}`]=false; 


setInterval(x => {
    ctx.clearRect(0,0,1000,1000);
    p.debugUpdate();
    Mapper.debugDraw();
},16);