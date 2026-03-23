import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import ContactFormDialog from "@/components/ContactFormDialog";

function parsePrice(price: string): number {
  const num = parseInt(price.replace(/\D/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU") + " ₽";
}

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, clearCart } = useCart();

  const cartProductsList = items
    .map((i) => `${i.title} × ${i.quantity} — ${i.price}`)
    .join("\n");

  const totalSum = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-card border-border w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl uppercase tracking-wider flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Корзина ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">Корзина пуста</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => {
                const itemTotal = parsePrice(item.price) * item.quantity;
                return (
                  <div key={item.id} className="flex gap-3 bg-background border border-border rounded-lg p-3">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm uppercase tracking-wide truncate">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.price} за шт.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center hover:border-primary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-heading w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center hover:border-primary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-primary text-sm font-heading mt-1">{formatPrice(itemTotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary table */}
            <div className="border-t border-border pt-4 space-y-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="text-left pb-2">Товар</th>
                    <th className="text-center pb-2">Кол-во</th>
                    <th className="text-right pb-2">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t border-border/50">
                      <td className="py-1.5 font-heading text-xs uppercase truncate max-w-[140px]">{item.title}</td>
                      <td className="py-1.5 text-center">{item.quantity}</td>
                      <td className="py-1.5 text-right text-primary font-heading">{formatPrice(parsePrice(item.price) * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border">
                    <td colSpan={2} className="pt-2 font-heading uppercase tracking-wider text-sm">Итого</td>
                    <td className="pt-2 text-right text-primary font-heading text-base">{formatPrice(totalSum)}</td>
                  </tr>
                </tfoot>
              </table>

              <ContactFormDialog defaultProduct={cartProductsList} onSubmitted={clearCart}>
                <button className="w-full bg-primary text-primary-foreground font-heading uppercase tracking-widest text-sm px-6 py-3.5 rounded hover:bg-primary/90 transition-colors">
                  Оформить заявку
                </button>
              </ContactFormDialog>
              <button
                onClick={() => {
                  clearCart();
                  setIsOpen(false);
                }}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
