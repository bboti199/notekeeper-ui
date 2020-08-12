import React from 'react';
import { useNote } from '../../queries/noteQueries';
import { useNoteContext } from '../../context';

export const Editor = () => {
  const [{ selectedNoteId }, dispatch] = useNoteContext();
  const { status, data, error, isFetching } = useNote(selectedNoteId);

  if (!selectedNoteId) {
    return <h1>No note selected</h1>;
  }

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  return (
    <div>
      <h1>Editor</h1>
      {JSON.stringify(data, null, 2)}

      <button
        onClick={() => {
          dispatch({ type: 'SET_SELECTED_NOTE', payload: { id: null } });
        }}
      >
        Close
      </button>
    </div>
  );
};
