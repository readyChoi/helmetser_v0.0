
export default class TypeConverUtil {
    
    typeMapping = (q:Object) => {
        try {
            if (q.hasOwnProperty("position") && typeof q['position'] === 'string') {
                q['position'] = parseInt(q['position'])
            }
            if(q.hasOwnProperty("count") && typeof q["count"] === 'string') {
				q['count'] = parseInt(q['count'])
			}
			if(q.hasOwnProperty("materialCount") && typeof q["materialCount"] === 'number') {
				q['materialCount'] = q['materialCount'].toString()
			}
			if(q.hasOwnProperty("companyNum") && typeof q["companyNum"] === 'string') {
				q['companyNum'] = parseInt(q['companyNum'])
			}
			if(q.hasOwnProperty("loanNum") && typeof q["loanNum"] === 'string') {
				q['loanNum'] = parseInt(q['loanNum'])
			}
			if(q.hasOwnProperty("materialPrice") && typeof q["materialPrice"] === 'string') {
				q['materialPrice'] = parseInt(q['materialPrice'])
			}
			if(q.hasOwnProperty("materialOrderNum") && typeof q["materialOrderNum"] === 'string') {
				q['materialOrderNum'] = parseInt(q['materialOrderNum'])
			}
			if(q.hasOwnProperty("materialPurchaseNum") && typeof q["materialPurchaseNum"] === 'string') {
				q['materialPurchaseNum'] = parseInt(q['materialPurchaseNum'])
			}
			if(q.hasOwnProperty("paybackPrice") && typeof q["paybackPrice"] === 'string') {
				q['paybackPrice'] = parseInt(q['paybackPrice'])
			}
			if(q.hasOwnProperty("licenseNum") && typeof q["licenseNum"] === 'string') {
				q['licenseNum'] = parseInt(q['licenseNum'])
			}
			if(q.hasOwnProperty("licensePrice") && typeof q["licensePrice"] === 'string') {
				q['licensePrice'] = parseInt(q['licensePrice'])
			}
			if(q.hasOwnProperty("productSalePrice") && typeof q["productSalePrice"] === 'string') {
				q['productSalePrice'] = parseInt(q['productSalePrice'])
			}
			if(q.hasOwnProperty("productNum") && typeof q["productNum"] === 'string') {
				q['productNum'] = parseInt(q['productNum'])
			}
			if(q.hasOwnProperty("productCount") && typeof q["productCount"] === 'string') {
				q['productCount'] = parseInt(q['productCount'])
			}
			if(q.hasOwnProperty("productSaleAppNum") && typeof q["productSaleAppNum"] === 'string') {
				q['productSaleAppNum'] = parseInt(q['productSaleAppNum'])
			}
			if(q.hasOwnProperty("loan") && typeof q["loan"] === 'string') {
				q['loan'] = parseInt(q['loan'])
			}

            return true;
        } catch(err) {
            console.log(err);
            return false
        }
    }

    convert = (q:any) => {
        let r:any = {};

        try {
            for (var key in q) {
                r[key] = q[key];
            }
            if (q.hasOwnProperty("position") && typeof q['position'] === 'string') {
                r['position'] = parseInt(q['position'])
            }
            if(q.hasOwnProperty("count") && typeof q["count"] === 'string') {
				r['count'] = parseInt(q['count'])
			}
			if(q.hasOwnProperty("materialCount") && typeof q["materialCount"] === 'string') {
				r['materialCount'] = q['materialCount'].toString()
			}
			if(q.hasOwnProperty("companyNum") && typeof q["companyNum"] === 'string') {
				r['companyNum'] = parseInt(q['companyNum'])
			}
			if(q.hasOwnProperty("loanNum") && typeof q["loanNum"] === 'string') {
				r['loanNum'] = parseInt(q['loanNum'])
			}
			if(q.hasOwnProperty("materialPrice") && typeof q["materialPrice"] === 'string') {
				r['materialPrice'] = parseInt(q['materialPrice'])
			}
			if(q.hasOwnProperty("materialOrderNum") && typeof q["materialOrderNum"] === 'string') {
				r['materialOrderNum'] = parseInt(q['materialOrderNum'])
			}
			if(q.hasOwnProperty("materialPurchaseNum") && typeof q["materialPurchaseNum"] === 'string') {
				r['materialPurchaseNum'] = parseInt(q['materialPurchaseNum'])
			}
			if(q.hasOwnProperty("paybackPrice") && typeof q["paybackPrice"] === 'string') {
				r['paybackPrice'] = parseInt(q['paybackPrice'])
			}
			if(q.hasOwnProperty("licenseNum") && typeof q["licenseNum"] === 'string') {
				console.log('licenseNum')
                r['licenseNum'] = parseInt(q['licenseNum'])
			}
			if(q.hasOwnProperty("licensePrice") && typeof q["licensePrice"] === 'string') {
				r['licensePrice'] = parseInt(q['licensePrice'])
			}
			if(q.hasOwnProperty("productSalePrice") && typeof q["productSalePrice"] === 'string') {
				r['productSalePrice'] = parseInt(q['productSalePrice'])
			}
			if(q.hasOwnProperty("productNum") && typeof q["productNum"] === 'string') {
				r['productNum'] = parseInt(q['productNum'])
			}
			if(q.hasOwnProperty("productCount") && typeof q["productCount"] === 'string') {
				r['productCount'] = parseInt(q['productCount'])
			}
			if(q.hasOwnProperty("productSaleAppNum") && typeof q["productSaleAppNum"] === 'string') {
				r['productSaleAppNum'] = parseInt(q['productSaleAppNum'])
			}
			if(q.hasOwnProperty("loan") && typeof q["loan"] === 'string') {
				r['loan'] = parseInt(q['loan'])
			}

            return r;
        } catch(err) {
            console.log('type convert err', err);
            return null
        }
    }
}

export interface iParams {
    position?: string,
    count? : string,
    materialCount: string,
    companyNum? : string, 
    loanNum? : string,
    materialPrice? : string,
    materialOrderNum? : string,
    materialPurchaseNum? : string,
    paybackPrice? : string,
    licenseNum? : string,
    licensePrice? : string,
    productSalePrice? : string,
    productNum? : string,
    productCount? : string,
    productSaleAppNum? : string,
    loan? : string,
}

export interface iConvertParams {
    position?: number,
    count? : number,
    materialCount: string,
    companyNum? : number, 
    loanNum? : number,
    materialPrice? : number,
    materialOrderNum? : number,
    materialPurchaseNum? : number,
    paybackPrice? : number,
    licenseNum? : number,
    licensePrice? : number,
    productSalePrice? : number,
    productNum? : number,
    productCount? : number,
    productSaleAppNum? : number,
    loan? : number,
}