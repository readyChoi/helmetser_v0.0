import passportLocal from "passport-local";
import { plainToClass } from "class-transformer";
const camelcaseKeysDeep = require('camelcase-keys-deep');

import MemberDao from "../daos/Member/MemberDao";
import Member from "../model/Member";

const LocalStrategy = passportLocal.Strategy;
const memberDao = new MemberDao()

/**
 * Sign in using Email and Password.
 */

const config = (app, passport) => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        console.log('serialize')
        done(null, { id: user.id, type: user.type })
    })

    passport.deserializeUser((user, done) => {
        console.log('deserialize', user.id, user.type)
        memberDao.selectMember(user.id).then((result) => {
            let obj = JSON.parse(JSON.stringify(result));
            let member = { id: obj.member_email, type: 'member', class_code: obj.class_code, company_num: obj.company_num, name: obj.member_name }
            done(null, member)
        }).catch((e) => {
            done(e, false)
        })
    })

    passport.use('member-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        // session: true,
        passReqToCallback: false
    }, (email, password, done) => {
        console.log('in passport member login', email, password)

        memberDao.selectMember(email).then((result) => {
            if (result) {
                result = camelcaseKeysDeep(result)
                let member = plainToClass(Member, result as Member)
                if (!member.authenticate(password)) {
                    console.log('is not authenticate by pw')
                    done(null, false, { message: 'User name or password is wrong' })
                } else {
                    console.log('in passport, member authenticate')
                    let obj = {
                        id: member.getMemberId(),
                        type: 'member',
                        name: member.getName(),
                        class_code: member.getClassCode(),
                        company_num: member.getCompanyNum(),
                    }
                    done(null, obj)
                }
            } else {
                console.log('in passport, id/pw is wrong')
                done(null, false, { message: 'User name or password is wrong' });
            }
        })
    }))

   
}
export default config;