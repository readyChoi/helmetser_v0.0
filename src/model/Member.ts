import bcrypt from 'bcryptjs'

interface member_json {
    member_email: String,
    member_password: String,
    member_name: String,
    member_phone: String,
    member_grade: String,
    join_date: String,
    latest_connect_date: String,
    class_code: String,

    company_num: Number,
    company_name: String,

    // application_num: number,
    // application_date: string
}

export default class Member {
    private memberNum!: number;
	private memberEmail!: string;
	private password!: string;
	private memberName!: string;
	private memberPhone!: string;
	private joinDate!: string;
	private latestConnectDate!: string;
	private grade!: string;
	private token!: string;
	private classCode!: string;
	private device!: string;
	
	private companyNum!: number;
	private companyName!: string;
	private companyCountry!: string;
	
	private applicationNum!: number;
	private applicationDate!: string;

    public constructor(init?:Partial<Member>) {
        Object.assign(this, init);
    }

    public authenticate(password:string) {
        return bcrypt.compareSync(password, this.password)
    }

    public getMemberNum(): number {
        return this.memberNum;
    }

    public setMemberNum(memberNum: number): Member {
        this.memberNum = memberNum;
        return this;
    }

    public getMemberEmail(): string {
        return this.memberEmail;
    }

    public setMemberEmail(memberEmail: string): Member {
        this.memberEmail = memberEmail;
        return this;
    }

    public getPassword(): string {
        return this.password;
    }

    public async setPassword(password: string): Promise<Member> {
        let mPwd = this.password
        let m = this;

        console.log('in setMemberPwd this?', m)
        await bcrypt.hash(password, 10).then((hash) => {
            console.log('bcrypt hash?', hash)
            m.password = hash;
        })

        console.log('after this?', m)
        return m;
    }

    public getMemberName(): string {
        return this.memberName;
    }

    public setMemberName(memberName: string): Member {
        this.memberName = memberName;
        return this;
    }

    public getMemberPhone(): string {
        return this.memberPhone;
    }

    public setMemberPhone(memberPhone: string): Member {
        this.memberPhone = memberPhone;
        return this;
    }

    public getJoinDate(): string {
        return this.joinDate;
    }

    public setJoinDate(joinDate: string): Member {
        this.joinDate = joinDate;
        return this;
    }

    public getLatestConnectDate(): string {
        return this.latestConnectDate;
    }

    public setLatestConnectDate(latestConnectDate: string): Member {
        this.latestConnectDate = latestConnectDate;
        return this;
    }

    public getGrade(): string {
        return this.grade;
    }

    public setGrade(grade: string): Member {
        this.grade = grade;
        return this;
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): Member {
        this.token = token;
        return this;
    }

    public getClassCode(): string {
        return this.classCode;
    }

    public setClassCode(classCode: string): Member {
        this.classCode = classCode;
        return this;
    }

    public getDevice(): string {
        return this.device;
    }

    public setDevice(device: string): Member {
        this.device = device;
        return this;
    }

    public getCompanyNum(): number {
        return this.companyNum;
    }

    public setCompanyNum(companyNum: number): Member {
        this.companyNum = companyNum;
        return this;
    }

    public getCompanyName(): string {
        return this.companyName;
    }

    public setCompanyName(companyName: string): Member {
        this.companyName = companyName;
        return this;
    }

    public getCompanyCountry(): string {
        return this.companyCountry;
    }

    public setCompanyCountry(companyCountry: string): Member {
        this.companyCountry = companyCountry;
        return this;
    }

    public getApplicationNum(): number {
        return this.applicationNum;
    }

    public setApplicationNum(applicationNum: number): Member {
        this.applicationNum = applicationNum;
        return this;
    }

    public getApplicationDate(): string {
        return this.applicationDate;
    }

    public setApplicationDate(applicationDate: string): Member {
        this.applicationDate = applicationDate;
        return this;
    }


    

    // constructor(json: member_json) {
    //     // this.memberNum;
    //     // this.memberEmail = json.member_email;
    //     // this.memberPassword = json.member_password;
    //     // this.memberName = json.member_name;
    //     // this.memberPhone = json.member_phone;
    //     // this.joinDate;
    //     // this.latestConnectDate;
    //     // this.grade = json.member_grade;
    //     // this.token;
    //     // this.classCode = json.class_code;
    //     // this.device;
        
    //     // this.companyNum = json.company_num;
    //     // this.companyName = json.company_name;
    //     // this.companyCountry;
        
    //     // this.applicationNum;
    //     // this.applicationDate;
    // }
    

}