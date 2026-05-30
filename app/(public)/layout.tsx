import { getSiteSettings } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const locale = getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader settings={settings} dict={dict} locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} dict={dict} />
    </div>
  );
}
