import axios from 'axios';

export default (await import('vue')).defineComponent({
name: 'HelloWorld',
data() {
return {
msg: 'Student Informations'.toUpperCase(),
f_name: '',
l_name: '',
address: '',
email: '',
phone: '',
isSubmitEnable: false,
errorMessage: '',
imageInput: '',
imageFile: [],
base64Image: '',
file2: null,
};
},
methods: {
checkSubmitEnable() {
this.isSubmitEnable =
this.f_name != '' &&
this.l_name != '' &&
this.address != '' &&
this.phone != '' &&
this.email != '' &&
this.file2 != null;
},
chk() {
alert(this.file2.name);
},
// image_file(event) {
//   // this.imageInput = event.target.files[0];
//   this.imageInput = this.file2
//   try {
//     // const fileInput = event.target;
//     const fileInput = this.file2;
//     if (fileInput.files.length > 0) {
//       const selectedFile = fileInput.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result;
//         // Remove the "data:image/jpeg;base64," prefix
//         const base64ImageWithoutPrefix = base64String.split(',')[1];
//         // Assign the Base64 image data without the prefix to your variable
//         this.base64Image = base64ImageWithoutPrefix;
//       };
//       reader.readAsDataURL(selectedFile);
//     } else {
//       this.base64Image = null;
//     }
//   } catch (error) {
//     console.log("ERROR | >" + error)
//   }
//   this.imageFile = event.target.files[0]
//   // console.log(this.base64Image)
// },
async addData() {
try {
// const fileInput = event.target;
const fileInput = this.file2;
if (fileInput.files.length > 0) {
const selectedFile = fileInput.files[0];
const reader = new FileReader();
reader.onload = () => {
const base64ImageWithoutPrefix = base64String.split(',')[1];

this.base64Image = base64ImageWithoutPrefix;
};
reader.readAsDataURL(selectedFile);
} else {
this.base64Image = null;
}
} catch (error) {
console.log("ERROR | >" + error);
}
break;
try {
let requestBody = {
first_name: this.f_name,
last_name: this.l_name,
address: this.address,
email: this.email,
phone_number: this.phone,
pic_url: "SGk=",
};
console.log(this.base64Image);
const response = await axios.post('http://localhost:7056/api/Student/save', requestBody);
console.log("sending...");
if (response.status === 201) {
alert("Data added successfully.");
console.log('Data added successfully.');
}
// else {
//   alert("Failed to add data.");
//   console.error('Failed to add data.');
// }
this.$router.push('/all_data');
} catch (error) {
// console.error('An error occurred:', error);
console.error('An error occurred:');
}
},
},
created() {
this.checkSubmitEnable();
},
});
