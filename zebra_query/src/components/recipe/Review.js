import React, { useRef } from 'react';

function Review(props) {
  const msgRef = useRef(null);

  let arr = [];
  for (let i = 1; i <= 5; i++) {
    arr.push(
      <i
        onClick={() => props.rating(i)}
        className={'fa-solid fa-star'}
        style={{ color: i <= props.rate ? 'goldenrod' : '', cursor: 'pointer' }}
      ></i>
    );
  }

  let makeRate = (rate) => {
    let arrs = [];
    for (let i = 1; i <= 5; i++) {
      arrs.push(<i className={'fa-solid fa-star'} style={{ color: i <= rate ? 'goldenrod' : '' }}></i>);
    }
    return arrs;
  };

  return (
    <div className="product__details__tab__desc">
      <h6>Reivew</h6>
      <div className="row">
        <table className="table">
          <tr>
            <td>
              {props.id !== '' ? (
                props.rCount === 0 ? (
                  <div>
                    <div className="product__details__rating" style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{props.nickname}&nbsp;</span>
                      {arr}
                      <table style={{ width: '100%', height: '100px' }}>
                        <tbody>
                          <tr>
                            <td width={'90%'}>
                              <textarea
                                style={{ width: '100%', resize: 'none', height: '100px' }}
                                ref={msgRef}
                                onChange={(e) => props.msging(e.target.value)}
                              ></textarea>
                            </td>
                            <td width={'10%'}>
                              <button
                                type="button"
                                className="btn primary-btn"
                                style={{ width: '100%', height: '100px' }}
                                onClick={() => {
                                  props.reviewInsert();
                                }}
                              >
                                작성
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div>이미 리뷰를 작성했습니다</div>
                )
              ) : (
                <div>로그인 후 작성 가능합니다</div>
              )}
            </td>
          </tr>
          {props.list &&
            props.list.map((review) => {
              return (
                <tr key={review.rno}>
                  <td>
                    <div className="review-list">
                      <div>
                        <span className="nick-rate">{review.nickname}</span>
                        {props.id === review.id ? (
                          <input type="button" className="xBtn" value={'X'} onClick={() => props.reviewDelete(review.rno)} />
                        ) : (
                          <></>
                        )}
                        <br />
                        {makeRate(review.rating)}
                        <br />
                        <span className="date">&nbsp;{review.regdate}</span>
                        <div className="r-content">
                          <pre>{review.content}</pre>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default Review;