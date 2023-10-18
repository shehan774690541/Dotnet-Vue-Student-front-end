<template>
    <div class="container">
        <div class="getHome">
            <router-link to="/home">
                <b-button type="is-primary" size="is-large">
                    <b-icon icon="home"></b-icon>
                </b-button>
            </router-link>
        </div>
        <div class="column is-mobile">
            <div class="column ">
                <form action="form.html" method="get">
                    <img :src="'http://localhost:7056/uploads/' + userPicture">

                    <b-field label="First Name">
                        <b-input v-model="fName" @input="checkSubmitEnable"></b-input>
                    </b-field>

                    <b-field label="Last Name">
                        <b-input v-model="lName" @input="checkSubmitEnable"></b-input>
                    </b-field>

                    <b-field label="Address">
                        <b-input v-model="address" @input="checkSubmitEnable"></b-input>
                    </b-field>

                    <b-field label="Email">
                        <b-input v-model="email" @input="checkSubmitEnable"></b-input>
                    </b-field>

                    <b-field label="Phone">
                        <b-input v-model="phone" @input="checkSubmitEnable"></b-input>
                    </b-field>

                    <b-field label="Separated filename">
                        <b-field class="file is-primary" :class="{ 'has-name': !!file2 }">
                            <b-upload v-model="file2" class="file-label" rounded @input="checkSubmitEnable">
                                <span class="file-cta">
                                    <b-icon class="file-icon" icon="upload"></b-icon>
                                    <span class="file-label">Click to upload</span>
                                </span>
                                <span class="file-name" v-if="file2">
                                    {{ file2.name }}
                                </span>
                            </b-upload>
                        </b-field>
                    </b-field>

                    <b-button type="is-success" @click="edit_informations()" :disabled="!isSubmitEnable">
                        Submit
                    </b-button>
                </form>
            </div>
        </div>
    </div>
</template>
  

<script>
import axios from 'axios';

export default {
    data() {
        return {
            msg: 'Edit Information'.toUpperCase(),
            isSubmitEnable: false,
            fName: '',
            lName: '',
            address: '',
            email: '',
            phone: '',
            usr_id: 0,
            student: [],
            userPicture: '',
            base64Image: '',
            selected_img: '',
            file2: null,
        };
    },
    computed: {
        user_idex_id() {
            this.usr_id = this.$route.query.id;
            this.searchStudent(this.$route.query.id);
            return this.$route.query.id;
        },
    },
    created() {
        try {
            this.user_idex_id();
        } catch (error) {

        }
    },
    methods: {
        async searchStudent(vlv) {
            console.log(vlv)
            try {
                const response = await axios.get(`http://localhost:7056/api/Student/${this.usr_id}`);
                if (response.data.status_code === 200) {
                    const student = response.data.data.student;
                    this.fName = student.first_name;
                    this.lName = student.last_name;
                    this.address = student.address;
                    this.email = student.email;
                    this.phone = student.phone_number;
                    this.userPicture = student.pic_url;
                    this.checkSubmitEnable();
                } else {
                    this.fName = '';
                    this.lName = '';
                    this.address = '';
                    this.email = '';
                    this.phone = '';
                    this.isSubmitEnable = false;
                    this.userPicture = '';
                    console.error('Failed to fetch student data');
                }
            } catch (error) {
                this.fName = '';
                this.lName = '';
                this.address = '';
                this.email = '';
                this.phone = '';
                this.isSubmitEnable = false;
                this.userPicture = '';
                console.error('An error occurred:', error);
            }
        },
        checkSubmitEnable() {
            this.isSubmitEnable =
                this.fName !== '' &&
                this.lName !== '' &&
                this.address !== '' &&
                this.email !== '' &&
                this.phone !== '' &&
                this.userPicture !== "" &&
                this.file2 !== "";
        }, alertCustom(title, message, type, icon) {
            this.$buefy.dialog.alert({
                title: title,
                message: message,
                type: type,
                hasIcon: true,
                icon: icon,
                iconPack: 'fa',
                ariaRole: 'alertdialog',
                ariaModal: true
            })
        },
        async edit_informations() {
            try {
                const fileInput = this.file2;
                const reader = new FileReader();
                // let requestBody;

                if (this.file2 == null) {
                    this.base64Image = this.userPicture + "~ ";

                    let requestBody = {
                        first_name: this.fName,
                        last_name: this.lName,
                        address: this.address,
                        email: this.email,
                        phone_number: this.phone,
                        pic_url: this.base64Image,
                    };

                    console.log(requestBody);

                    axios.put(`http://localhost:7056/api/Student/${this.usr_id}` , requestBody)
                        .then((response) => {
                            if (response.status === 200) {
                                this.alertCustom("Successfull", `Your Edit is successful!`, "is-success", "check");
                                console.log('Data edited successfully.');
                                this.$router.push('/home_page');
                            } else {
                                this.alertCustom("Error", "Failed to edit data.", "is-ganger", "times-circle");
                                console.error('Failed to edit data.');
                            }
                        })
                        .catch((error) => {
                            // console.error('An error occurred:', error);
                        });
                }
                else {
                    reader.onload = () => {
                        const base64String = reader.result;
                        const base64ImageWithoutPrefix = base64String.split(',')[1];
                        this.base64Image = this.userPicture + "~" + base64ImageWithoutPrefix;

                        let requestBody = {
                            first_name: this.fName,
                            last_name: this.lName,
                            address: this.address,
                            email: this.email,
                            phone_number: this.phone,
                            pic_url: this.base64Image,
                        };

                        console.log(requestBody);

                        axios.put(`http://localhost:7056/api/Student/${this.usr_id}`, requestBody)
                            .then((response) => {
                                if (response.status === 200) {
                                    this.alertCustom("Successfull", `${this.usr_id} is edited!`, "is-success", "check");
                                    console.log('Data edited successfully.');
                                    this.$router.push('/home_page');
                                } else {
                                    this.alertCustom("Error", "message", "is-ganger", "times-circle");
                                    console.error('Failed to edit data.');
                                }
                            })
                            .catch((error) => {
                                console.error('An error occurred:', error);
                            });
                    };
                }
                reader.readAsDataURL(fileInput);
            } catch (error) {
                console.log(error);
            }
        },

    },
};
</script>
  