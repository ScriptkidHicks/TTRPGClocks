import { StaticImageData } from "next/image";
import styled from "styled-components";

interface StaticPageProps {
  $backgroundimage: string;
}

const StaticImagePageBackground = styled.div<StaticPageProps>`
  background-image: url(${(props) => props.$backgroundimage});
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  padding: 0;
`;

const PageCenterFlow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
`;

export { StaticImagePageBackground, PageCenterFlow };
