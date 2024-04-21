
const commonCssIcon = (w = 22, h = 22) => {
   return `.icon {
        display: inline-block;
        width: ${w}px; 
        height: ${h}px;
        border-radius: 50%;
        transform: rotate(45deg);
      }
      .icon::before, .icon::after { 
        position: absolute; 
        content: ''; 
        background-color: #fff; 
      }
    `;
};

export const successIcon = (w = 22, h = 22) => {
    return `
        ${commonCssIcon(w, h)}
        .icon.icon-success          { background: green; }
        .icon.icon-success:before   { width:  3px; height:  9px; top:  6px; left: 11px; }
        .icon.icon-success:after    { width:  3px; height:  3px; top: 12px; left:  8px; }
    `;
};

export const errorIcon = (w = 22, h = 22) => {
    return `
        ${commonCssIcon(w, h)}
        .icon.icon-failure          { background: red; }
        .icon.icon-failure::before  { width:  3px; height: 12px; top:  5px; left: 10px; }
        .icon.icon-failure::after   { width: 12px; height:  3px; top: 10px; left:  5px; }
    `;
};