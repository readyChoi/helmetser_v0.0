import { sqlCode } from "../../config/requestCode";

import DatabaseService from '../../database/DatabaseService'
import AWS from "../../database/AwsService";
import Member from "../../model/Member";
import { database } from '../../Server'

export default class MemberDao {

    constructor() {

    }

    insertAuthApplication = (member: Member, conn?: any) => new Promise((resolve, reject) => {
        let sql = "INSERT INTO authentication VALUES (?, NOW());"

        database.query(sql, [member.getMemberId()], conn).then((result: any) => {
            if (result.affectedRows == 0) throw { code: 'insertAuthApplication', msg: 'Insert Auth App Error!' }
            resolve(result)
        })
            .catch(err => {
                console.log('Insert Product Sale App Error : ')
                console.log(err)
                reject(err)
            });
    })

    memberExist = (email: String, conn?: any) => new Promise((resolve, reject) => {
        let sql = "SELECT member_email \
                    FROM member \
                    WHERE member_email = ?"
        database.query(sql, [email], conn).then(
            (result: any) => resolve(result)
        );
    })

    selectEmailAuthAppInfo = (email: String, conn?: any) => new Promise((resolve, reject) => {
        let sql = "SELECT member_id\
                    FROM member\
                    WHERE member_id = ?"
        database.query(sql, [email], conn).then(
            (result: any) => {
                resolve(result)
            }
        );
    })

    // selectMember = (email:String) => new Promise((resolve, reject) =>{
    //     let sql = "SELECT m.member_email, m.member_name, m.member_password, m.member_phone, \
    //                         m.join_date, m.token, m.class_code, m.grade, \
    //                         c.company_num, c.company_name\
    //                 FROM member m LEFT JOIN company c\
    //                         ON m.company_num = c.company_num\
    //                 WHERE member_email = #{memberEmail}";
    //     database.query(sql, [email]).then(
    //         (result:any) => {
    //             resolve(result)
    //         }
    //     );
    // })

    selectMember = (email: string, conn?:any) => new Promise((resolve, reject) => {
        let sql = "SELECT member_id, name, password, phone, reg_date \
                    FROM member\
                    WHERE member_id = ?";
        database.query(sql, [email], conn).then(
            (result: any) => {
                resolve(result[0])
            }
        );
    })

    selectCompanyMemberToken = (companyNum:number, conn?:any) => new Promise((resolve, reject) => {
        let sql = "SELECT m.token\
                    FROM member m JOIN company c\
                            ON m.company_num = c.company_num \
                    WHERE c.company_num = ?";
        
        database.query(sql, [companyNum], conn).then(
            (result: any) => {
                resolve(result)
            }
        );
    })

    insertMember = (email: string, pwd: string, name: string, phone: string, token?: string, conn?: any) => new Promise((resolve, reject) => {
        let tok = !token ? '' : token;
        console.log('in insertMember', email, pwd, name, phone, tok)

        let sql = 'INSERT INTO member \
        (member_id, status, reg_date, point, membership_code, password, name, phone, token)\
        VALUES (?, 0, NOW(), 0, 0, ?, ?, ?, ?);'

        database.query(sql, [email, pwd, name, phone, tok], conn).then((result: any) => {
            if (result.affectedRows == 0) throw { code: 'insertMember', msg: 'Insert Member Error!' }
            resolve(result)
        })
            .catch(err => {
                console.log('Insert Member Error : ')
                console.log(err)
                reject(err)
            });
    })

    updateToken = (email:string, token:string, conn?:any) => new Promise((resolve, reject) => {
        let sql = 'UPDATE member \
                    SET token = ?\
                    WHERE member_email = ?'

        database.query(sql, [token, email], conn).then(
            (result: any) => {
                resolve(result)
            }
        );
    })

    updateLastestLoginDate = (email: String, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE member SET latest_connect_date = NOW() \
		            WHERE member_email = #{email}";

        database.query(sql, [email], conn).then(
            (result: any) => {
                resolve(result)
            }
        );
    })

    updateClassEnter = (class_code: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE class \
                    SET participation_num = (participation_num + 1) \
                    WHERE class_code = ?";

        database.query(sql, [class_code], conn).then((result: any) => {
            if (result.affectedRows != 1) throw { code: 'updateClassEnter', err: 'Update Class Error!' }
            resolve(result)
        })
            .catch(err => {
                console.log('updateMemberClass Error : ')
                console.log(err)
                reject(err)
            });
    })

    updateMemberClass = (email: string, class_code: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE member \
                    SET class_code = ?\
                    WHERE member_email = ?";

        database.query(sql, [class_code, email], conn).then((result: any) => {
            if (result.affectedRows != 1) throw { code: 'updateMemberClass', err: 'Update Member Class Error!' }
            resolve(result)
        })
            .catch(err => {
                console.log('updateMemberClass Error : ')
                console.log(err)
                reject(err)
            });
    })

    insertCompanyApplication = (email: string, company_num: number, conn?: any) => new Promise((resolve, reject) => {
        let sql = "INSERT INTO company_application VALUES (?, ?, NOW())"

        database.query(sql, [email, company_num], conn).then((result: any) => {
            if (result.affectedRows == 0) throw { code: 'insertCompanyApplication', msg: 'Not Insert Company Applicaion!' }
            resolve(result)
        })
            .catch(err => {
                console.log('updateMemberClass Error : ')
                console.log(err)
                reject(err)
            });
    })

    deleteCompanyApplication = (email: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "DELETE \
                    FROM company_application \
                    WHERE member_email = ?"

        database.query(sql, [email], conn).then(
            (result: any) => {
                if (result.affectedRows == 0) throw { msg: 'Delete Company Application Error!' }
                console.log(result)
                resolve(result)
            }
        ).catch((err) => {
            console.log('deleteCompanyApp Error : ')
            console.log(err)
            reject(err)
        });
    })

    updateGradeCompany = (email: string, company_num: number, grade: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE member \
                    SET grade = ?, company_num = ? \
                    WHERE member_email = ?"

        database.query(sql, [grade, company_num, email], conn).then(
            (result: any) => {
                if (result.affectedRows != 1) throw { code: 'updateGradeCompany', msg: 'Update Grade Company Application Error!' }
                console.log(result)
                return resolve(result)
            }
        ).catch((err) => {
            console.log('updateGradeCompany Error : ')
            console.log(err)
            return reject(err)
        });
    })

    selectCompanyAppList = (companyNum: number, classCode: number, conn?: any) => new Promise((resolve, reject) => {
        let sql = "SELECT ca.application_date, m.member_email, m.member_name, m.member_phone\
                    FROM member m JOIN company_application ca \
                                ON m.member_email = ca.member_email \
                    WHERE ca.company_num = ? \
                    AND m.class_code = ?\
                    ORDER BY ca.application_date DESC";
        database.query(sql, [companyNum, classCode], conn).then(
            (result: any) => {
                resolve(result)
            }
        );
    })

    updateMemberClassExit = (email: string, classCode:string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE member \
                    SET class_code = ?,\
                        grade = null,\
                        company_num = null\
                    WHERE member_email = ? "

        database.query(sql, [classCode, email], conn).then(
            (result: any) => {
                if (result.affectedRows != 1) throw { code: 'updateMemberClassExit', msg: 'Update Member Class Exit Error!' }
                console.log(result)
                return resolve(result)
            }
        ).catch((err) => {
            console.log('updateMemberClassExit Error : ')
            console.log(err)
            return reject(err)
        });
    })

    updateClassExit = (classCode: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE class\
                    SET participation_num = (participation_num - 1)\
                    WHERE class_code = ?"

        database.query(sql, [classCode], conn).then(
            (result: any) => {
                if (result.affectedRows != 1) throw { code: 'updateClassExit', msg: 'Update Class Exit Error!' }
                console.log(result)
                return resolve(result)
            }
        ).catch((err) => {
            console.log('updateClassExit Error : ')
            console.log(err)
            return reject(err)
        });
    })

    selectMemberGrade = (email: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "SELECT grade FROM member WHERE member_email = ?";
        database.query(sql, [email], conn).then(
            (result: any) => {
                resolve(result)
            }
        );
    })

    deleteCompany = (companyNum: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "DELETE \
                FROM company\
                WHERE company_num = ?";

        database.query(sql, [companyNum], conn).then(
            (result: any) => {
                if (result.affectedRows == 0) throw { code: 'deleteCompany', msg: 'Delete Company Error!' }
                console.log(result)
                resolve(result)
            }
        ).catch((err) => {
            console.log('deleteCompany Error : ')
            console.log(err)
            reject(err)
        });
    })

    updateMemberLogout = (classCode: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "UPDATE class\
                    SET participation_num = (participation_num - 1)\
                    WHERE class_code = ?"

        database.query(sql, [classCode], conn).then(
            (result: any) => {
                if (result.affectedRows != 1) throw { code: 'updateClassExit', msg: 'Update Class Exit Error!' }
                console.log(result)
                return resolve(result)
            }
        ).catch((err) => {
            console.log('updateClassExit Error : ')
            console.log(err)
            return reject(err)
        });
    })

    deleteMember = (email: string, conn?: any) => new Promise((resolve, reject) => {
        let sql = "DELETE \
                    FROM member \
                    WHERE member_email = ?"

        database.query(sql, [email], conn).then(
            (result: any) => {
                if (result.affectedRows != 1) throw { code: 'deleteMember', msg: 'Delete Member Error!' }
                console.log(result)
                return resolve(result)
            }
        ).catch((err) => {
            console.log('deleteMember Error : ')
            console.log(err)
            return reject(err)
        });
    })
}