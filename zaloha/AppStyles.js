import styled from "styled-components";

export const PageContainer = styled.div`
   display: flex;
   max-width: 1200px;
   width: 100%;
   min-height: 100vh;
   justify-content: center;
   align-items: center;
   align-self: center;
   justify-self: center;
`;
export const Formular = styled.form`
   width: 800px;
   min-height: 800px;
   border: 1px solid black;
   padding: 20px;
   display: grid;
   grid-template-columns: 1fr;
   grid-template-areas:
      'nadpis'
      'vyber'
      'vlastnosti'
      'doprava'
      'kalkulace'
      'email';
   gap: 20px;
`;
export const FormSection = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   background-color: lightblue;
   padding: 20px;
   &:nth-child(1){
      grid-area: nadpis;
   }
   &:nth-child(2){
      grid-area: vyber;
   }
   &:nth-child(3){
      grid-area: vlastnosti;
   }
   &:nth-child(4){
      grid-area: doprava;
   }
   &:nth-child(5){
      grid-area: kalkulace;
   }
   &:nth-child(6){
      grid-area: email;
   }
`;
export const SectionTitle = styled.h2`
   color: black;
   font-size: 20px;
   margin: 0px;
   padding: 0;
   padding-bottom: 10px;
`;
export const MainTitle = styled(SectionTitle)`
   font-size: 30px;
   align-self: center;
   justify-self: center;
`;