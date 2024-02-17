import { StaticImageData } from "next/image";
import styled from "styled-components";

interface StaticPageProps {
  backgroundimage: StaticImageData;
}

const StaticImagePageBackground = styled.div<StaticPageProps>`
  background-image: ${(props) => props.backgroundimage.src};
  background-attachment: fixed;

  display: flex;
  flex-direction: row;

  width: 100vw;
  height: 100vh;

  padding: 0;
`;

export { StaticImagePageBackground };
