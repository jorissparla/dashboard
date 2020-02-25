import * as React from 'react';
import styled from 'styled-components';
// import './survey.css';

const Percentage = styled.div<{ percentage: any }>`
  display: flex;
  justify-self: center;
  align-content: center;
  background: grey;
  width: 300px;
  height: 80%;
  padding: 1px;
  grid-column: 1 / span 2;
  grid-row: 3;

  .perc_in {
    width: ${props => (props.percentage ? `props.percentage` : `50%`)};
    font-size: 20px;
    background: rgb(16, 180, 79);
  }
`;

const PercentageComponent = (props: any) => {
  const percentage = props.percentage;
  return (
    <Percentage percentage={percentage}>
      <div className="perc_in">{percentage} %</div>
    </Percentage>
  );
};

interface Props {
  sent: number;
  responded: number;
  pct_satisfied: number;
  pct_dissatisfied: number;
  satisfied_feedback: number;
  dissatisfied_feedback: number;
  feedback_comments: number;
  pct_feedback_comments: number;
  uncategorized?: number;
  pct_uncategorized?: number;
}

interface IPapier {
  width?: number | string;
  backgroundColor?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledPapier = styled.div`
  color: black;
  background-color: ${(props: IPapier) =>
    props.backgroundColor ? props.backgroundColor : 'rgb(127, 186, 219)'};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  min-width: 200px;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  font-family: Montserrat;
  width: ${(props: IPapier) => (props.width ? props.width : '18%')};
  min-width: 200px;
  border-radius: 14px;
`;

const TitlesRow = styled.div`
  padding: 2px;
  align-content: center;
  display: flex;
  /* border: 1px solid blueviolet; */
  height: 20%;
  justify-content: space-evenly;
`;
const ResultsRow = styled.div`
  display: flex;
  /* border: 1px solid blueviolet; */
  height: 50%;
  font-size: 32px;
  font-weight: 900;
  justify-content: space-evenly;
  align-items: center;
`;

const BottomBar = styled.div`
  padding-top: 10px;
  display: flex;
  /* border: 1px solid blueviolet; */
  height: 50%;
  justify-content: space-evenly;
`;

const RedBox = styled.div`
  background: red;
  height: 32px;
  width: 32px;
`;
const GreenBox = styled.div`
  background: green;
  height: 32px;
  width: 32px;
`;

const NormalText = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
const UnNormalText = styled.div`
  font-size: 16px;
  font-weight: 400;
  opacity: 0;
`;

export const SurveyComponent: React.FC<Props> = ({
  sent,
  responded,
  pct_satisfied,
  pct_dissatisfied,
  satisfied_feedback,
  dissatisfied_feedback,
  feedback_comments,
  pct_feedback_comments,
  uncategorized,
  pct_uncategorized
}) => {
  const pct = Math.round((100 * responded) / sent);
  return (
    <div style={{ background: '#fff', color: '#333', height: '250px', marginLeft: 10 }}>
      <h1>Quick Satisfaction survey Results</h1>

      <Container id="x">
        <ResponseRate sent={sent} responded={responded} pct={pct} />

        <Satisfaction pct_dissatisfied={pct_dissatisfied} pct_satisfied={pct_satisfied} />

        <Feedback
          satisfied_feedback={satisfied_feedback}
          feedback_comments={feedback_comments}
          pct_feedback_comments={pct_feedback_comments}
        />
        {/* {false && (
          <div className="top-row1">
            <div className="box3">
              <div className="sat">Unsatisfied Feedback</div>
              <div className="red-box" />
              <div className="red-box2" />
              <div className="large2">{dissatisfied_feedback}</div>
              <div className="large2">{uncategorized}</div>
              <div>Uncategorized({pct_uncategorized}%)</div>
              </div>
              </div>
            )} */}
      </Container>
    </div>
  );
};

interface RRProps {
  sent: number;
  responded: number;
  pct: number;
}
const ResponseRate: React.FC<RRProps> = ({ sent, responded, pct }) => (
  <StyledPapier width="30%" backgroundColor="#EEE;">
    <TitlesRow>
      <div style={{ paddingRight: 10 }}>Sent</div>
      <div style={{ paddingLeft: 10 }}>Responded</div>
    </TitlesRow>
    <ResultsRow>
      <div style={{ paddingRight: 10 }}>{sent}</div>
      <div style={{ paddingLeft: 10 }}>{responded}</div>
    </ResultsRow>
    <BottomBar>
      <PercentageComponent percentage={pct} />
    </BottomBar>
  </StyledPapier>
);

interface SatisfactionProps {
  pct_satisfied: number;
  pct_dissatisfied: number;
}
const Satisfaction: React.FC<SatisfactionProps> = ({ pct_satisfied, pct_dissatisfied }) => (
  <StyledPapier width="30%" backgroundColor="#EEE;">
    <TitlesRow>
      <div>Overall Satisfaction</div>
    </TitlesRow>
    <ResultsRow>
      <GreenBox />
      <div>{pct_satisfied}%</div>
      <NormalText>{'    '}Satisfied</NormalText>
    </ResultsRow>
    <ResultsRow>
      <RedBox />
      <div>{pct_dissatisfied}%</div>
      <NormalText>Unsatisfied</NormalText>
    </ResultsRow>
  </StyledPapier>
);
interface FeedbackProps {
  satisfied_feedback: number;
  feedback_comments: number;
  pct_feedback_comments: number;
}
const Feedback: React.FC<FeedbackProps> = ({
  satisfied_feedback,
  feedback_comments,
  pct_feedback_comments
}) => (
  <StyledPapier width="30%" backgroundColor="#EEE;">
    <TitlesRow>
      <div>Satisfied Feedback</div>
    </TitlesRow>
    <ResultsRow>
      <GreenBox />
      <div>{satisfied_feedback}</div>
      <UnNormalText>Comments({pct_feedback_comments}%)</UnNormalText>
    </ResultsRow>
    <ResultsRow>
      <GreenBox />
      <div>{feedback_comments}</div>
      <NormalText>Comments({pct_feedback_comments}%)</NormalText>
    </ResultsRow>
  </StyledPapier>
);
