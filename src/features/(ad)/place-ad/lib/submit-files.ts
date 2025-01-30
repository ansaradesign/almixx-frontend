// const handleSubmit = async (e: SyntheticEvent) => {
//   e.preventDefault();

//   if (!files || files.length === 0) return;

//   const formData = new FormData();

//   for (let i = 0; i < files.length; i += 1) {
//     formData.append('file', files[i]);
//   }

//   await fetch('http://192.168.22.188:8000/api/v1/create/', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method: 'POST',
//     body: formData,
//   });
// };
