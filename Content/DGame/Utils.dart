#library("dgameutils");

class Utils {
  static double round(double value, [int decimals = 2]) { 
    int o = Math.pow(10, decimals); 
    return (value * o).round() / o;
  }
  
  static num random([num min = 0, num max = 1, bool wholeNumbers = false]) {
    num value = min + (Math.random() * (max - min));
    if (wholeNumbers)
      value = value.round();
    
    return value;
  }
}
