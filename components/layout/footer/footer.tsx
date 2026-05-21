export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background px-6 py-2">
      <div className="flex items-center justify-end">
        <p className="text-xs text-muted-foreground">
          © {currentYear} Nettalco S.A. - TODOS LOS DERECHOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}
