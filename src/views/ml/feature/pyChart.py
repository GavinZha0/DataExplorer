import matplotlib.pyplot as plt;
import numpy as np;
x = np.random.randn(100);
y = np.random.randn(100);
fig, ax = plt.subplots();
ax.scatter(x,y);
pyscript.write("varChart",fig);