export const getCommonButton = () => {
    return `       
        text-align: center;
        color: white;
        border-radius: 4px;
        border: none;
        width: fit-content;
        font-size: 14px;
        padding: 10px;
        user-select: none;
        cursor: pointer;
        font-weight: bold;

        &:focus { 
            outline: none;
            box-shadow: none;
        }
    `;
}