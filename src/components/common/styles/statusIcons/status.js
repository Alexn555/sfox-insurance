// solution Jun 28, 2022 lonix (c) Stackoverflow.com

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

export const successIcon = (w = 22, h = 22, includeMain = true) => {
    return `
        ${includeMain ? commonCssIcon(w, h) : ''}
        .icon.icon-success          { background: green; }
        .icon.icon-success:before   { width:  3px; height:  9px; top:  6px; left: 11px; }
        .icon.icon-success:after    { width:  3px; height:  3px; top: 12px; left:  8px; }
    `;
};

export const warnIcon = (w = 22, h = 22, includeMain = true) => {
    return `
        ${includeMain ? commonCssIcon(w, h) : ''}
        .icon.icon-warn          { background: orange; }
        .icon.icon-warn::before  { width:  3px; height: 12px; top:  5px; left: 10px; }
        .icon.icon-warn::after   { width: 12px; height:  3px; top: 10px; left:  5px; }
    `;
};

export const errorIcon = (w = 22, h = 22, includeMain = true) => {
    return `
        ${includeMain ? commonCssIcon(w, h) : ''}
        .icon.icon-error          { background: red; }
        .icon.icon-error::before  { width:  3px; height: 12px; top:  5px; left: 10px; }
        .icon.icon-error::after   { width: 12px; height:  3px; top: 10px; left:  5px; }
    `;
};