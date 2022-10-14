import React from 'react';
import classNames from 'classnames/bind';
import classes from './Policy.module.scss';
import Paragraph from './components/Paragraph';

const cx = classNames.bind(classes);

const DELIVERY_POLICY = [
    {
        title: 'Scope',
        paragraph: "Linkosuo's online store is an online store operated by Linkosuo Kahvilan Oy.",
        list: [
            'Linkosuo Kahvila Oy',
            'Social security number 0154374-4',
            'Mannakorventie 1, 36240 Kangasala',
            '040 619 0097, contact person Daniela Mandelin, daniela.mandelin@linkosuo.fi',
        ],
        sub_paragraph: [
            'The customer must be an adult and full-fledged natural person or a registered company or association. For consumer customers, in addition to these terms and conditions, consumer protection legislation and Finnish law are observed.',
            'These general terms and conditions become applicable and binding on the parties when the customer has read, acknowledged his acceptance of these terms and conditions and placed an order in the shopping cart, and when the seller has confirmed the order as received.',
            "The seller reserves the right to change these terms and conditions and the price list. The changes come into effect for new orders when the changes are published on the online store's website.",
        ],
    },
    {
        title: 'Placing an order',
        paragraph:
            "Products are ordered from the online store by moving them to the shopping cart and paying for the contents of the shopping cart. After you have chosen the products you want, you can continue your order by going to the shopping cart from the store's top menu and then to the checkout. Please note that all our products have an order time of 4 business days during the exceptional period. You select the order delivery date and pick-up point in the shopping cart before proceeding to checkout.",
        list: [
            'Step 1:  Check the contents of your order.',
            'Step 2:  Choose a pick-up point and pick-up date',
            'Step 3:  Go to checkout',
            'Step 4:  Fill in your information and proceed to pay',
            'Step 5:  Choose a payment method and make the payment',
        ],
        sub_paragraph: [
            'You will receive an order confirmation in your email after paying for the order. If you do not receive an order confirmation, send us an email at kauppa@linkosuo.fi and we can check that your order has been registered.',
        ],
    },
    {
        title: 'Delivery of products',
        paragraph:
            'The products ordered by the customer are delivered to the selected pick-up point on the selected pick-up day, from where the customer picks up his order. We keep the order one day after the collection date. Here, the customer should consider the best of the product before the date, because we always prepare the products on the morning of the pick-up day. We always ask you to inform us if the order cannot be picked up on the selected pick-up day.',
        sub_paragraph: [
            'If there are problems with the delivery of the product or there is a defect in the product itself, then you must act as stated in the complaint section.',
        ],
    },
    {
        title: 'Payment',
        paragraph:
            'The order is paid in the online store, and the customer receives an order confirmation in their e-mail after paying for the order. The most common payment cards as well as bank payments and mobilepay are accepted as payment methods in the online store.',
        sub_paragraph: [
            'Paytrail Oyj (2122839-7) operates as the payment intermediary service provider and in cooperation with Finnish banks and credit institutions. Paytrail Oyj appears as the recipient of the payment on the bank statement or card invoice and forwards the payment to the merchant. Paytrail Oyj has a payment institution license. In cases of complaints, we ask that you first contact the supplier of the product.',
            'Paytrail Oyj, business ID: 2122839-7',
            'Innova 2',
            'Lutakonaukio 7',
            '40100 Jyväskylä',
            'Phone: 020 718 1830',
            'www.paytrail.com',
        ],
    },
    {
        title: 'Cancellation and return of the purchase',
        paragraph:
            'You can cancel your online store order during the order day. You can send the cancellation to us by email at kauppa@linkosuo.fi.',
        sub_paragraph: [
            'Online store orders do not have the right of return. The limitations of the right to return are determined in accordance with Chapter 6, 16 of the Consumer Protection Act: quickly perishable, out-of-date and customer-tailored products, or products that, due to their nature, are inseparably mixed with other goods after delivery.',
        ],
    },
    {
        title: 'Complaints',
        paragraph:
            'Linkosuon Kahvila Oy undertakes to deliver orders on time and as ordered. However, if there is something wrong with the product or delivery, please contact kauppa@linkosuo.fi',
    },
    {
        title: 'Storage of customer data',
        paragraph:
            "The customer's information is stored in Linkosuo's customer register. By ordering the service, the customer has read and accepted the service's registration statement.",
    },
    {
        title: 'Quality guarantee',
        paragraph:
            'Linkosuon Kahvila Oy is responsible for the quality and safety of the packaged products for delivery within one day, on the condition that the products have been stored in a manner suitable for food at a cool temperature below + 6 degrees.',
    },
    {
        title: 'Force Majeure',
        paragraph:
            "Linkosuon Kahvila Oy is not liable to the customer for any damage caused by a strike, lockout, stoppage of public traffic, fire, power outage, or any other cause beyond Linkosuon Kahvila Oy's control.",
    },
];

const Policy = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <h2 className={cx('heading__title')}>TERMS OF DELIVERY</h2>
            </div>
            <div className={cx('content')}>
                {DELIVERY_POLICY.map((policy, index) => (
                    <Paragraph
                        key={Math.random()}
                        index={index + 1}
                        title={policy.title}
                        paragraph={policy.paragraph}
                        sub_paragraph={policy.sub_paragraph}
                        list={policy.list}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Policy);
