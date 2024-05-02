const commonTabStyle = (theme) => {
    return `
        .tab {
            overflow: hidden;
            background-color: ${theme.background};
            border-radius: 4px;
        }
        
        .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
            font-size: 17px;
        }
        
        .tab button:hover {
            background-color: ${theme.hover};
            color: white;
            border-radius: 4px;
        }
        
        .tab button.active {
            background-color: ${theme.background};
        }
        
        .tabcontent {
            display: none;
            padding: 6px 12px;
            background-color: white;
            border: 1px solid ${theme.border};
            border-top: none;
        } 
    `;
};

export default commonTabStyle;