<template>
    <div class="bg">
        <div class="top_header">
            <h1>{{ title_ }}</h1>
            <router-link to="/home">
                <div class="go_back">
                    <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72" enable-background="new 0 0 72 72"
                        xml:space="preserve">
                        <g>
                            <path
                                d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255
c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489
c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021
C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57
c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506
c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414
c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z" />
                        </g>
                    </svg>
                </div>
            </router-link>
        </div>
        <div class="content">
            <br>
            <table>
                <tr class="tbl_th">
                    <th colspan="3">#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>E-mail</th>
                    <th>Phone</th>
                    <th>picture</th>
                </tr>
                <tr v-for="(student, index) in students" :key="student.id">
                    <td style="width: 30px;">
                        <div class="btn_del" v-on:click="deleteItem(student.id)">
                            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429"
                                xml:space="preserve">
                                <g>
                                    <g>
                                        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z" />
                                        <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z" />
                                        <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z" />
                                        <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z" />
                                    </g>
                                </g>
                            </svg>

                        </div>
                    </td>
                    <td style="width: 30px;">
                        <router-link :to="{ path: '/edit', query: { id: student.id } }">
                            <div class="btn_del" v-on:click="edit_ithems(student.id)">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                        fill="#0F0F0F" />
                                </svg>
                            </div>
                        </router-link>
                    </td>
                    <td style="padding: 0px; max-width: fit-content;">{{ student.id }}</td>
                    <td>{{ student.first_name }}</td>
                    <td>{{ student.last_name }}</td>
                    <td>{{ student.address }}</td>
                    <td>{{ student.email }}</td>
                    <td>{{ student.phone_number }}</td>
                    <td>
                        <img :src="'http://localhost:7056/uploads/' + student.pic_url"
                            :alt="'{' + student.pic_url + '} not found!'" width="100px">

                    </td>
                </tr>
            </table>
        </div>
        <div class="add_new">
            <router-link to="/add_info">
                <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>new-indicator</title>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="scheduler" fill="#000000" transform="translate(85.333333, 85.333333)">
                            <path
                                d="M170.666667,1.42108547e-14 C264.923264,-3.10380131e-15 341.333333,76.4100694 341.333333,170.666667 C341.333333,264.923264 264.923264,341.333333 170.666667,341.333333 C76.4100694,341.333333 2.57539587e-14,264.923264 1.42108547e-14,170.666667 C2.6677507e-15,76.4100694 76.4100694,3.15255107e-14 170.666667,1.42108547e-14 Z M170.666667,42.6666667 C99.9742187,42.6666667 42.6666667,99.9742187 42.6666667,170.666667 C42.6666667,241.359115 99.9742187,298.666667 170.666667,298.666667 C241.359115,298.666667 298.666667,241.359115 298.666667,170.666667 C298.666667,99.9742187 241.359115,42.6666667 170.666667,42.6666667 Z M192,85.3333333 L191.999333,149.333333 L256,149.333333 L256,192 L191.999333,191.999333 L192,256 L149.333333,256 L149.333333,191.999333 L85.3333333,192 L85.3333333,149.333333 L149.333333,149.333333 L149.333333,85.3333333 L192,85.3333333 Z"
                                id="Combined-Shape">

                            </path>
                        </g>
                    </g>
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            vlv: "All Data",
            students: [],
            title_: "All Students Informations",
        };
    },
    created() {
        this.fetchStudentList();
    },
    methods: {
        async fetchStudentList() {
            try {
                const response = await axios.get('http://localhost:7056/api/Student/List');

                if (response.data.status_code === 200) {
                    this.students = response.data.data.students;
                    this.title_ = "All Students Informations";
                } else {
                    console.error('Failed to fetch student data');
                    this.title_ = "Failed to fetch student data";
                }
            } catch (error) {
                alert('An error occurred: ' + error);
                this.title_ = "An error occurred: " + error;
                console.error('An error occurred:', error);
            }
        },
        async deleteItem(del_id) {
            console.log(del_id)
            try {
                const response = await axios.delete(`http://localhost:7056/api/Student/${del_id}`);

                if (response.status === 204) {
                    console.log('Item deleted successfully.');
                } else {
                    console.error('Failed to delete item.');
                }
                this.fetchStudentList();
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        async edit_ithems(edit_id) {
            // alert(edit_id)
            this.$router.push(`/all_data/${id}`);
        }
    },
};
</script>

<!-- <style>
.btn_del {
    width: 20px;
    height: 20px;
    margin: 10px;
}

.bg {
    width: 100%;
    height: 100vh;
    display: flex;
}

.top_header {
    width: 100%;
    position: fixed;
    background-color: rgb(118, 216, 251);
    margin-top: -60px;
}

.go_back {
    width: 30px;
    margin-top: -55px;
    margin-bottom: 10px;
}

.top_header h1 {
    margin-top: 10px;
}

.content {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.content table {
    width: 100%;
}

table {
    background-color: #222;
}

table tr {
    margin: 10px;
}

table .tbl_th {
    background-color: rgb(71, 96, 119);
    color: #eee;
    padding: 50px;
}

table tr:nth-child(2n+3) {
    background-color: rgb(207, 207, 255);
}

table tr:nth-child(even) {
    background-color: aliceblue;
}

.add_new {
    position: fixed;
    top: 86%;
    left: 20;
    z-index: 999;
    width: 45px;
    padding: 2px;
    /* background-color: aqua; */
    transition: ease 0.16s;
}
.add_new:hover {
    background-color: #ffffff;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0px 0px 10px #222; 
}

@media (max-width: 600px) {
    .content table {
        width: 600px;
    }
}
</style> -->