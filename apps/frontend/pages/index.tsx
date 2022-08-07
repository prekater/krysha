import Link from 'next/link';
import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="nav">
            <Link href={'/offers/create'}> Создать предложение </Link>
          </div>
          <div id="nav">
            <Link href={'/offers/choose'}> Подобрать предложение </Link>
          </div>
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
