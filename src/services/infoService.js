import { simulateDelay } from '../components/common/utils/server';

export default class InfoService {

    getDisclaimer() {
        const data = `  This is a website of companies offering financial services - SFoxInsurance, SFoxInsurance Liising.
                  
        Before entering into any agreement read and conditions of respective service. Consult a specialist, where necessary.
        SFoxInsurance does not provide a credit advisory service for the purposes of the Insurance Intermediates Act.
        The borrower makes the decision of taking out a loan, who accesses the suitability of the loan product and contractual terms to his/her personal
        loan interest, need and financial situation on the basis of the information and warnings presented by the bank
        and is responsible for the consequences related to concluding the agreement.`;
        
        return simulateDelay(1000).then(() => { return data; });
    }

}