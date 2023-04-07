import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        backgroundColor: string;
        textColor: string;
        pointColor: string; 
        boxColor: string;
        titleColor: string; 
    }
}