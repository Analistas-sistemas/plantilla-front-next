/**
 * Loading State Management
 * Store simple para manejar estado de loading global
 */

type LoadingListener = (isLoading: boolean, message?: string) => void;

class LoadingStore {
  private isLoading = false;
  private message?: string;
  private listeners: Set<LoadingListener> = new Set();

  /**
   * Muestra el indicador de loading
   */
  show(message?: string): void {
    this.isLoading = true;
    this.message = message;
    this.notify();
  }

  /**
   * Oculta el indicador de loading
   */
  hide(): void {
    this.isLoading = false;
    this.message = undefined;
    this.notify();
  }

  /**
   * Obtiene el estado actual
   */
  getState(): { isLoading: boolean; message?: string } {
    return {
      isLoading: this.isLoading,
      message: this.message,
    };
  }

  /**
   * Suscribe un listener a cambios de estado
   */
  subscribe(listener: LoadingListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notifica a todos los listeners
   */
  private notify(): void {
    this.listeners.forEach((listener) =>
      listener(this.isLoading, this.message)
    );
  }
}

// Singleton
export const loadingStore = new LoadingStore();
