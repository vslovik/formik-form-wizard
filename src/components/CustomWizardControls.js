import React from 'react';

export default function CustomControls({ back, isLastPage, isFirstPage }) {
  return <div>
    <button type="submit">{ isLastPage ? 'Finish signup' : 'Next »'}</button>
    <br/>
    {!isFirstPage && <button type="button" onClick={back}>
       « Previous
    </button>}
  </div>
}
