import axios from 'axios';

const Delete = (props) => {
  const handleClick = async () => {
    await axios.delete(`/listings/delete/${props.id}`, 
      { data: { id: props.id } }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }

  return (
    <button
      onClick={handleClick}
    >
      delete
    </button>
  );
}

export default Delete;