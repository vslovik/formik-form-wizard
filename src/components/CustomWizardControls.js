import React from 'react';

export default function CustomControls({ back, next, isSubmitting, isLastPage, isFirstPage }) {
  return <div>
    <button onClick={next} disabled={isSubmitting}>{ isLastPage ? 'Finish signup' : 'Next »'}</button>
    <br/>
    {!isFirstPage && <button type="button" onClick={back}>
       « Previous
    </button>}
  </div>
}
