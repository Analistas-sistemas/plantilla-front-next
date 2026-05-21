import { redirectToError } from '@/lib/errors';

export default function NoEncontradoPage() {
  redirectToError('404');
}
