# LSYSTEM
generates fractals based on a set of instructions
open index.html and click the generate button to see the results

sentence rules
F - draw line
+ - rotate to the right
- - rotate to the left
[ - save position
] - return to the saved position
O - run color change code

eg
rule: F -> F+F-F[F+F]

axiom: FF

FF -> F+F-F[F+F] -> F+F-F[F+F]+F+F-F[F+F]-F+F-F[F+F][F+F-F[F+F]+F+F-F[F+F]] -> ...

