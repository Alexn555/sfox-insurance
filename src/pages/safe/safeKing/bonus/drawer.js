import { NumberService } from '../../../../services/utils';
import { SafeKingSets } from '../sets';

export default class BonusDrawer {
    constructor(background) {
        this.sets = SafeKingSets.bonus;
        this.stgsAnm = this.sets.animation;
        this.background = background || 'white';
        this.ctx = null;
    }

    setContext(ctx, canvas) {
       this.ctx = ctx; 
       this.$canvas = canvas;
    }

    drawScore(score) {
        let ctx = this.ctx;
        ctx.font = "bold 18px Courier";
        ctx.fontWeight = 'bold';
        ctx.fillText(`Your score ${score}`, 70, 250);
    }

    drawBonusWinnings(bonus) {
        if (this.stgsAnm.showBonusWins) {
            let ctx = this.ctx;
            ctx.font = "bold 12px Courier";
            ctx.fontWeight = 'bold';
            ctx.fillText(`bonus ${bonus}`, 70, 220);
        }
    }

    drawGlow(color = '#2ca3f2') {
        if (this.stgsAnm.showGlow) {
            this.glow(color);
        }
    }

    clearGlow() {
        if (this.stgsAnm.showGlow) {
            this.glow(this.background);
        }
    }

    glow(color = this.background) {
        let ctx = this.ctx;
        ctx.shadowColor = color;
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.stroke();
        ctx.fill();
    }

    drawLine(w, weight = 4) {
        let colors = ['blue', 'red', 'orange'];
        let ctx = this.ctx;
        ctx.lineWidth = weight;
        ctx.beginPath();
        ctx.moveTo(-150, 50);
        ctx.lineTo(w, 50);
        ctx.strokeStyle = colors[NumberService.randomInteger(0, colors.length)];
        ctx.stroke();
    }
    
    clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }

    rotateImage(img, props, clear = true) {
        let iw = img.naturalWidth * props.scale;
        let ih = img.naturalHeight * props.scale;
        let axisLen = Math.hypot(props.axisX, props.axisY);
        let nAx = props.axisX / axisLen;
        let nAy = props.axisY / axisLen;
        let wScale = Math.cos(props.rotate);
        let ctx = this.ctx;
        
        let w = this.$canvas.width;
        let h = this.$canvas.height;
        if (clear) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, w, h);
        }
      
        ctx.setTransform(nAy * wScale, -nAx * wScale, nAx, nAy, props.centerX, props.centerY);
        ctx.globalAlpha = 1;
        ctx.drawImage(img, -iw * 0.5, -ih * 0.5, iw, ih);
        if (props.backCol) {
            ctx.globalAlpha = wScale < 0 ? 1 : 1 - wScale;
            ctx.fillStyle = props.backCol;
            ctx.fillRect(-iw * 0.5, -ih * 0.5, iw, ih);
        }
    }
}