import * as React from "react";
import styled from "styled-components";
import "./survey.css";

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
  pct_satisfied?: number;
  pct_dissatisfied?: number;
  satisfied_feedback?: number;
  dissatisfied_feedback?: number;
  feedback_comments?: number;
  pct_feedback_comments?: number;
  uncategorized?: number;
  pct_uncategorized?: number;
}

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
    <div style={{ background: "#fff", color: "#333", height: "250px" }}>
      <h1>Quick Satisfaction survey Results</h1>

      <div className="flex">
        <div className="top-row1">
          <div className="box">
            <div className="sat0">Sent</div>
            <div className="sat0">Responded</div>
            <div className="large">{sent}</div>
            <div className="large">{responded}</div>
            <PercentageComponent percentage={pct} />
          </div>
        </div>
        <div className="top-row1">
          <div className="box2 ">
            <div className="sat">Overall satisfaction</div>
            <div className="green-box" />
            <div className="red-box" />
            <div className="large col2">{pct_satisfied}%</div>
            <div className="col3">Satisfied</div>
            <div className="large col2">{pct_dissatisfied}%</div>
            <div className="col3">Unsatisfied</div>
          </div>
        </div>
        <div className="top-row1">
          <div className="box3">
            <div className="sat">Satisfied Feedback</div>
            <div className="green-box" />
            <div className="green-box2" />
            <div className="large2">{satisfied_feedback}</div>
            <div className="large2">{feedback_comments}</div>
            <div>Comments({pct_feedback_comments}%)</div>
          </div>
        </div>
        {false && (
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
        )}
      </div>
    </div>
  );
};
