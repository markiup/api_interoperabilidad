export class Utils {
  static getNombreUnidad(unidad: string): string {
    switch (unidad) {
      case '4346':
        return 'HA:HECTÁREA';
      case '4348':
        return 'M2:METRO CUADRADO';
      case '4347':
        return 'CD:CUADRA';
      default:
        return unidad || '';
    }
  }
}
