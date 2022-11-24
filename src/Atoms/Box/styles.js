import styled from 'styled-components';
import { BOX_STATE } from '../../Constants/Box';

export const BoxContainer = styled.span`
    height: 2rem;
    width: 2rem;
    margin: .2rem;
    ${(props) => {
        switch (props.$state) {
            case BOX_STATE.MISS:
                return `
                background-color: transparent;
                `;
            case BOX_STATE.HIT:
                return `
                background-color: orangered;
                `;
            case BOX_STATE.SINK:
                return `
                background-color: darkred;
                `;
            case BOX_STATE.SHIP:
                return `
                background-color: dimgrey;
                `;
            default:
                return `
                background-color: mediumblue;
                `;
        }
    }}
    
    &:hover {
        opacity: 0.8;
    }
`;
