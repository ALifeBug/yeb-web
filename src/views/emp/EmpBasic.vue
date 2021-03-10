<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input style="width: 300px;margin-right: 10px;"
                          placeholder="请输入员工名进行搜索..."
                          prefix-icon="el-icon-search"
                          v-model="empName"
                          clearable
                          @clear = "initEmps"
                          @keydown.enter.native="initEmps"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="initEmps">搜索</el-button>
                <el-button type="primary">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索</el-button>
            </div>
            <div>
                <el-button type="success">
                    <i class="fa fa-level-up" aria-hidden="true"></i>
                    导入数据</el-button>
                <el-button type="success">
                    <i class="fa fa-level-down" aria-hidden="true"></i>
                    导出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
            </div>
        </div>
        <div style="margin-top: 10px;">
            <el-table
                    :data="emps"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        fixed
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workId"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证号码"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        label="民族"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        label="籍贯"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="politicsStatus.name"
                        label="政治面貌"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮件"
                        align="left"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系地址"
                        align="left"
                        width="270">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        label="所属部门"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="joblevel.name"
                        label="职称"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        label="职位"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        label="聘用形式"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="school"
                        label="毕业院校"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        label="专业"
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="workState"
                        label="在职状态"
                        align="left"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="入职日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        label="转正日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        label="合同起始日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        label="合同截止日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        label="合同期限"
                        align="left"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>年
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="200">
                    <template slot-scope="scope">
                        <el-button style="padding: 3px;" size="mini">编辑</el-button>
                        <el-button style="padding: 3px;" size="mini" type="primary">查看高级资料</el-button>
                        <el-button style="padding: 3px;" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="添加员工"
                :visible.sync="dialogVisible"
                width="80%">
            <div>
                <el-form ref="empForm" :model="emp">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名：" prop="name">
                                <el-input size="mini" prefix-icon="el-icon-edit" style="width: 150px;" v-model="emp.name" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别：" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期：" prop="birthday">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        type="date"
                                        size="mini"
                                        style="width: 150px;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌：" prop="politicId">
                                <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族：" prop="nationId">
                                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯：" prop="nativePlace">
                                <el-input v-model="emp.nativePlace" placeholder="请输入籍贯" prefix-icon="el-icon-edit" size="mini" style="width: 120px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱：" prop="email">
                                <el-input v-model="emp.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-message" size="mini" style="width: 150px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址：" prop="address">
                                <el-input v-model="emp.address" placeholder="请输入电子邮箱" prefix-icon="el-icon-edit" size="mini" style="width: 200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位：" prop="posId">
                                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称：" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门：" prop="departmentId">
                                <el-input v-model="emp.departmentId" placeholder="请输入部门" prefix-icon="el-icon-edit" size="mini" style="width: 150px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码：" prop="phone">
                                <el-input v-model="emp.phone" placeholder="请输入电话号码" prefix-icon="el-icon-phone" size="mini" style="width: 200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号：" prop="workId">
                                <el-input v-model="emp.workId" placeholder="请输入工号" prefix-icon="el-icon-edit" size="mini" style="width: 150px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历：" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校：" prop="school">
                                <el-input v-model="emp.school" placeholder="请输入学校" prefix-icon="el-icon-edit" size="mini" style="width: 150px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称：" prop="specialty">
                                <el-input v-model="emp.specialty" placeholder="请输入专业名称" prefix-icon="el-icon-edit" size="mini" style="width: 200px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期：" prop="beginDate">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        type="date"
                                        size="mini"
                                        style="width: 120px;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="转正日期：" prop="conversionTime">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        type="date"
                                        size="mini"
                                        style="width: 120px;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期：" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        type="date"
                                        size="mini"
                                        style="width: 120px;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="合同截止日期：" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        type="date"
                                        size="mini"
                                        style="width: 170px;"
                                        value-format="yyyy-MM-dd"
                                        placeholder="合同截止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码">
                                <el-input v-model="emp.idCard" placeholder="请输入身份证号码：" prefix-icon="el-icon-edit" size="mini" style="width: 200px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式：" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况：" prop="weblock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data(){
            return{
                emps:[],
                loading:false,
                total: 0,
                page:1,
                currentPage: 1,
                size:10,
                empName: '',
                dialogVisible: false,
                nations:[],
                joblevels:[],
                politicsstatus:[],
                positions:[],
                emp:{
                    name: "",
                    gender: "",
                    birthday: "",
                    idCard: "",
                    wedlock: "",
                    nationId: null,
                    nativePlace: "",
                    politicId: null,
                    email: "",
                    phone: "",
                    address: "",
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: "",
                    tiptopDegree: "",
                    specialty: "",
                    school: "",
                    beginDate: "",
                    workState: "",
                    workId: "",
                    contractTerm: null,
                    conversionTime: "",
                    notWorkDate: null,
                    beginContract: "",
                    endContract: "",
                    workAge: null,
                    salaryId: null
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }]
            }
        },
        mounted() {
            this.initEmps();
        },
        methods:{
            initData(){
                if(!window.sessionStorage.getItem('nations')){
                    this.getRequest('/employee/basic/nations')
                }
            },
            sizeChange(size){
              this.size = size;
              this.initEmps();
            },
            currentChange(currentPage){
                this.currentPage = currentPage;
                this.initEmps();
            },
            showAddEmpView(){
                this.dialogVisible=true;
            },
            initEmps(){
                this.loading = true
                this.getRequest('/employee/basic/?currentPage='+this.currentPage+'&size='+this.size+'&name='+this.empName).then(resp=>{
                    this.loading = false
                    if(resp){
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>