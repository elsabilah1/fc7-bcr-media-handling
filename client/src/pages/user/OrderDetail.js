import CardOrder from '../../components/user/OrderDetail/CardOrder';
import TransferMethod from '../../components/user/OrderDetail/TransferMethod';

export default function OrderDetail() {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="col-span-full lg:col-span-2">
                <TransferMethod />
            </div>
            <CardOrder />
        </div>
    );
}
