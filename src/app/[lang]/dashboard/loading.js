import { CenteredSpinnerContainer, Spinner } from "./page.module";

export default function loading() {
  return (
    <CenteredSpinnerContainer>
      <Spinner />
    </CenteredSpinnerContainer>
  );
}
