import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import User, {
  Product,
  SaleItem,
  Member,
  Payment,
  Sale,
  Ministry,
  Courtesy
} from './model';

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useTokenStore = create(
  persist<TokenState>(
    (set) => ({
      token: null,
      setToken: (token) => {
        set({ token: token });
      },
      clearToken: () => {
        set({ token: null });
        sessionStorage.clear();
      },
    }),
    {
      name: 'userLoginStatus',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);



interface ProductState {
  products: Product[],
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id)
  })),
}));




interface SaleItemState {
  saleItems: SaleItem[];
  setSaleItems: (saleItems: SaleItem[]) => void;
  addSaleItem: (saleItem: SaleItem) => void;
  removeSaleItem: (id: number) => void;
  alterQuantity: (id: number, quantity: number) => void;
}

const useSaleItemStore = create(
  persist<SaleItemState>(
    (set) => ({
      saleItems: [],
      setSaleItems: (saleItems) => set({ saleItems }),
      addSaleItem: (saleItem) =>
        set((state) => ({ saleItems: [...state.saleItems, saleItem] })),
      removeSaleItem: (id) =>
        set((state) => ({
          saleItems: state.saleItems.filter((saleItem) => saleItem.product.id !== id),
        })),
      alterQuantity: (id, quantity) =>
        set((state) => ({
          saleItems: state.saleItems.map((saleItem) =>
            saleItem.product.id === id ? { ...saleItem, quantity } : saleItem
          ),
        })),
    }),
    {
      name: 'saleItem-storage'
    }
  )
);



interface PaymentState {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  addPayment: (payment: Payment) => void;
  removePayment: (guid: string) => void;
}

interface MemberState {
  member: Member | null;
  setMember: (member: Member) => void;
}

const useMemberStore = create<MemberState>((set) => ({
  member: null,
  setMember: (member) => set({ member })
}))




const usePaymentStore = create(
  persist<PaymentState>(
    (set) => ({
      payments: [],
      setPayments: (payments: Payment[]) => set({ payments }),
      addPayment: (payment: Payment) => set((state) => ({ payments: [...state.payments, payment] })),
      removePayment: (guid: string) => set((state) => ({
        payments: state.payments.filter((payment) => payment.guid !== guid)
      }))
    }),
    {
      name: 'payment-storage', // Nome usado para armazenar no localStorage
    }
  )
);


interface SaleState {
  sales: Sale[];
  sale: Sale | null;
  setSales: (sales: Sale[]) => void;
  setSale: (sale: Sale) => void;
}

const useSaleStore = create<SaleState>((set) => ({
  sales: [],
  sale: null,
  setSales: (sales) => set({ sales: sales }),
  setSale: (sale) => set({ sale: sale })

})
)

interface PaymentTypeState {
  paymentType: number | null,
  setPaymentType: (paymentType: number | null) => void;
}

const usePaymentTypeStore = create<PaymentTypeState>((set) => ({
  paymentType: null,
  setPaymentType: (paymentType) => set({ paymentType: paymentType })
}))


interface PayValueState {
  payValue: number,
  setPayValue: (payValue: number) => void
}

const usePayValueStore = create<PayValueState>((set) => ({
  payValue: 0,
  setPayValue: (payValue) => set({ payValue: payValue })
}))

interface UIState {
  loading: boolean;
  message: string | null;
  setLoading: (loading: boolean, message?: string | null) => void;
}

const useUiStore = create<UIState>((set) => ({
  loading: false,
  message: null,
  setLoading: (loading: boolean, message: string | null = null) => set({ loading, message }),
}));



interface MinistryState {
  ministries: Ministry[]
  setMinistries: (ministries: Ministry[]) => void
}

const useMinistryStore = create<MinistryState>((set) => ({
  ministries: [],
  setMinistries: (ministries) => set({ ministries: ministries })
}))




interface CourtesyState {
  courtesies: Courtesy[],
  setCourtesies: (courtesies: Courtesy[]) => void
}

const useCourtesyStore = create<CourtesyState>((set) => ({
  courtesies: [],
  setCourtesies: (courtesies) => set({ courtesies: courtesies })
}))


interface CashFlow {
  value: number,
  paymentType: number | null,
  type: number,
  description: string
}

interface CashFlowState {
  cashFlows: CashFlow[],
  setCashFlows: (cashFlows: CashFlow[]) => void;
}

const useCashFlowStore = create<CashFlowState>((set) => ({
  cashFlows: [],
  setCashFlows: (cashFlows) => set({ cashFlows: cashFlows })
}))

export interface Cash {
  cashFlows: CashFlow[],
  cashValue: number,
  product: Product;
  debitValue: number,
  creditValue: number,
  pixValue: number,
  opennedValue: number,
  consumptionValue: number,
  opennedDate: Date,
  closedDate: Date | null,
  id: number
}

interface CashState {
  cashes: Cash[],
  setCashes: (cashes: Cash[]) => void;
}

const useCashStore = create<CashState>((set) => ({
  cashes: [],
  setCashes: (cashes) => set({ cashes: cashes })
}))



interface UserState {
  users: User[],
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users: users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (id) => set((state) => ({ users: state.users.filter(user => user.id !== id) }))
}));


export {
  useTokenStore,
  useProductStore,
  useSaleStore,
  useSaleItemStore,
  usePaymentTypeStore,
  usePayValueStore,
  usePaymentStore,
  useMinistryStore,
  useCourtesyStore,
  useMemberStore,
  useCashFlowStore,
  useCashStore,
  useUiStore,
  useUserStore
};