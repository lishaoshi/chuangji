<template>
    <div id="Introduction">
        <div class="top">
            <div class="go-back" @click="goBack">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-back" />
                </svg>
            </div>
            <p>推广简介</p>
        </div>
        <!-- logo -->
            <div class="Introduction-logo">
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAEKCAMAAAB6/iDxAAAC61BMVEUAAABnWv6If/eCd/h1afloWvlmWf9mWf9nWvtpXPlnWvuxrfRoW/lmWP5mWP9nWvxmWf9mWf9mWf9mWf+Xjf5yZ/NsX+6XjvltYO6Ngf2Tif1sX+1tYO6Kfv5mWf+Kfv9tYO6MgP7Z2OBtYO6Rhv3OzfHZ2OGQhf/Y1+Gvp8aKfv6YkPiJff7Rz+bc2tjZ2OCjnPWNgv7Z2OCyrPfZ2OCJff7Z2OCXjv3Z2OD97Fjx7Eqspvqxq/uXjvr47FKwqvyimvz87FauqPv/61v67FXt7EaAdfLKx+JmWf9sYP////91aP92af+Xjf6spv5sX+21r/mIfP+Si/37/PaLfv+YkfFxX//W0//2+v+Phf/q6Onf3///61v47lhqWP+pov1pXP9jVPiGgvFrXv99cvhwZP97bv+EfPiUkPmFef+Qi/lzZf+jm/5xZ8iXlPmal/lxZfj19f/9/f95bfjMyf92afmcm/mBdfmNiPpwYfnr6v+CePm4sv9vYv+HgPnCwrr0MnGJg/p0aPFwY/CLhfqZkf/Cvv/Ewf/w51Ph4v/5+f+/u//b2eHk5Ob++cqspfh0Zvl2bf6CdP97bvZuYO6wqvwiFxWgl/13avTg3+R5c8rd3eHv8PPx8f/u7Eehm/ael/Jut93y9PmViv26tfdzwOT39/Xe4eza2f7n5//77muQsvH985Wln/VzntfJyPlvptWhq/nq7O5qVKl5cfHY2ddtrdfP0MzExb3161Jsns/98H5yq9uarfZtk8p9u+lGIQbBv/Dd2/Wmoe7IyML/97yBefTq4WP99KeKgNX6t77n5/ZqXPWdler/9a/98o3RyIlMPFiso6fLxKTh13ROLzisteKRi+GAd8/99rPARqmQi/Kbkc/8+MJRR669ta2/tJOFqN6kpNl+ND2AjtFIP8b/9sIsJpO80veBeOG7t9ymR7/Oko/bNnx0aHpjW1qOTthbU8GPi5ZgT9Xtp645MqtVPIG2f3ecZV30pkg5AAAASHRSTlMA/hwJEUSsiWlQJv1b35Y1znjtvvXA7uKqWzbhk9Kh9nh2ZcxG/vcnJv7oz5FEEdbBucHcp6fqjIo94M+npIB8ZiToymez7c1jJCI5AAA0fElEQVR42uycYW7CMAyFt9s5ag5hKcqvnCF3HxvVBMUwFurGD/s7QRV9Nc+Oywe9O5xQafmaJVHwGu+vO1FJoPRlK3yhYBwfugMX+BvhG1MwihPdkYWvW+FrCD+KG93pEzbRpJZD+ND9fyAX+NuetVMwgCfdgVvW1JcY0uyAL92JcYWvIfzrONMdOtHUvKGhTCVLMdNsONMdOdGklhGnkpxOWHkz3emOnGg63pCG04qNB/WnO3Si6Uve0G14JLGWFkvCe9QdOtHUBWYquf0dNRDhfeqOXOBTzRhDmh/ZjQnvVHds4Vu2vzrGSaR80jwc6w6daLYRvpIxOIlMH9I41h26wPfFcG2Xhl82elbPumML/9uzWmtVz7LbFN637shD+JSayasm4UTt9KzOdccu8KmZm0JyOjEmvH7ND90JumU1czm/wuPPzk3/jjh0JwJPNIayDJfhl5XrEX1I6P4NeKIxIjyX8Wfvx1yZhe5nwBONBeHL+MualoOuzEL3FfBEM114BtlrDt1XwBNNoecxdXItCyj1rKH7BdiJZl6E57LPupv+mmfofgl4gZ8jPJe9Vn/01zxD92vAhZ8Q4ct+32bpf4sbum+A/v+lo/drFUK7boQP3W8AL/APelZTB1WX/Ayd9iR0FwBvWe9HeDvnJIZ2/Z41dJcAH8Lf193KObUsod+zhu4S0InmsewWzqnmP1C7dgrdJYATzYRPQYtCjlHqWUN3AeBEY37yLg0fj+tZQ3cB2ERTaBKsENo1InzoLgCaaArTPMp+w0fFa6fQXQAz0TBNhXcM7Wo9a+gugJhoDHzExzvmGKWeNXQXwEs009fdv9g7d90mgiiAKn931yMssU2EXOSiq+U1NFiRQMiL0pgIU2EJ0RBRUJi0fMHSAg1FGgoaSoIEAgEl8XoZk13H88hOZnY85xNGx+Nz966Tki2yUjItrp2i7gp4f8F7IfsctHK/tzezRt1rdFB49x2TLBODlJ9CmmOe8FF3Nfx9UdJ9xxBnbJkYSHbG1VYSPuquiqcXvHPZMWMLkuU5WU5487VT1F0dD0dW9x2TMwEntXPKWpDdMOGj7hr49hDefcck7BSiqZEuZGYl0CTq3qQrReNcduSsTiaEt7hxMp9Zo+5NulE0zjsGM7aKXLFonMysUfcG3Sga51d7zs4iqV3wlhM+B3Wi7g26UDTOZSe2Bk7inLxbO0Xda/hfNLQFbkHO1iOamnxL+Kh7De+LxvnVnjM5GYoL3qu1U9S9hudF43xETZgSoqnJWsLrr52i7g28Lhrnj9qlHdOcWZE8Svio+yn8vuCdy54xHTipFc2FrZ02Xvdr4/5otDOFBX4L77xjcqaJmFnJUsJrTqwbrvv04WBBfwtMWP+iZGAdkzATMhRFY3ntlIOUjdadjQaCMazDgwvetezImSG5OCebCc8Q5Gyw7sntV5Xqjw4mB9sgQXdkDatj5NGuMLOSxYTPQIWN1R3H20L2Ya/XmzwBc5rf1LFjVs2smFhIeJ3F6qbqfnl3UHF/2CsZQwNfisa17MTZueEozqmVhI9bVXWuPR5UHE56FX1YhQdF0+2OacyslLS+dspBlaB0v/rjByiQ9QcVj+70BI9BgmrRBNYxOWuNXFzwbc6sDEGZgHT/dFQUxSfNaNfWXV40QXVMwtqkSmxqM+Ez0CAc3X8Vcz6AhCsi2oXsDd3NocA6hrOW4aXwSG0lPCPQIRjdfxTF5+Off45gLVMR7fdFtLepO2BAVztmzAIcxTkZJXz88d6cD8XR2xPW6s6f1iZUie5GYCCyQ85sIGZWaiHhc9AkGN2Pit9Cd+laSUyo9/f376jpfu8GKLJFIfyEg5hFSk3xvAnPEHQJRveiOD6x/fjsdn/ZnFDvPE7TdEdF9wdvZrNboAp2/mpHzuySiHMyFj4DfQLT/fMvWM3N/fpaqTfZHadzDiW6l7LPuQfKULdH1JzZJ1E5J8qZZEbVIyDdT2Lm+IwHkU9GzWh/9SxdsC3R/e5C9tcHOnWP1N1H7Qm7EDhKzwkBcPXMyjf8b0R+KP78/Pm5+A5N8p1mtB/upP/Yleh+o5R9Mhzugg4YO0ZGVgovG1+QS2ZUDULR/ePegm9Ka6WDUZoq656Vsp/wCvSgDnYMZuwiKbUl2ceeWGNGNSQQ3d/vVXyRvwvWm+xfSjV0hzfvhiWHoAlS1zpGGu1WhEfpxz5htRnVkDB03/q2V/ERTjFtvgs23C6jXUP3G7NJqfsEtMFOdUzCXJAAAElPIq/NqGaEoTt8WaH7qbWSiPZHItqVdc9mz4clHPSh7nQMZ27gCIAkO4lqZuXxX5HN073iKwjov18r9WrRrqW7qJkpGIDUiY7BjLkjQwCUfskRFzOqKeHqvuJdsMnDS6mJ7i+qmrkCRmDsGCk5ApD0S+7cpxSa7nuwYLpcKy2jfZymJrpfn1U18wwMIc87hjhzTg6AZPtzH6bubMVaaXA7TQ10L22fLWqmD6Zg7Bg5CQASWCUQ3f+yc3Y9TUNhHO98f3+9984Lv8lhKMFGs+ouNii6OciGzLkytk50sDBCBJURMxbNYoxeGBN0gWsl3HiFiV7oJXca0fgJPC3tadedrYWzzrPSX0Kg4bK/PPk/z3lOf+p0x++CzbPsjnSHtkMqsu4kS5NBanNMppsWBm2X3Wm6/wKeBrtgO9U9imx/9QgQ4OGpzDFd3TQBe1ZbcZru3zDHSiPKLtgOw8zRLdsLPaSvIkhhaaclyGjCu9ndnD9yZd/Y2Nj8Ub8LBkM7ie7B86hPJYWnTHYA6GhTa8gA+3CQ7l+KMusXakN7D8uS6Q665UY1n0wOzHVnPICEIE/TFQ4ZmsK7QhewC4fo/uTevY2iyl/T0I4IBCzonglLaSYVjkQEISeOJYjSdpCq0i5BYaKxrWd1iO4eVNwh6/oLHM3o8XNc2Ez3OSEWeyEdMz2TbB8XxdBYnKj88FS0qLUEaUs0NkV4h+gOfn3z/9hc31L+t/ECB555PweJNtedz92NxaLR89D3vGr7WHIgQRJDgvx/H7UboW1CY5fwztB9cP6DX+KvTvfXgeayT3EQs+p+IyrZDvkwMjKl2T4QTxC9DOpkB4DCCG9Lz8ocOXbw7BnQwWjHSheQ7uW0uezmuvPQdkn3cDj2aaQQlmwPybbHE7N0tJmtg8IIb0fPykhA50+c6tAXqDtWqhaLn6Hu2gUOPL2vOc6S7qJqeyTyrDzSq7M9kRgFzoO6CN/6npVB7N1/+sBx0GHUfGJgaUt334KZ7NZ052PI9ohwNOXT2z473KHVoRkURvjBFuc+ppY9hw+e7ZwXafjEwCLU/Utx3Ux2q7p3K7ZD3WFuf1YWZdsfx+OS7c7UncII39qelcFw8tC5TijzdZ8YeAmH7uvNdE+nOIS57nN620Vxfkhv+2gXcCb0RfhW9qxMA/bRXuZxnxgoFt8h3c1kN9e9K6q3PRSKQNsHVNtH54BToW6voIU9K4MHpXlahza4XTBfM92nkexWdfeINbaP1diedK7uFCaalvWsjBlHaEw2N6exFzg2vyxuFjd9bB2XamS/XrKm+2ykoe2zUSfrTmGiaVHPylhhD5xTAnowfmIAXeDwvyx8/Vvy1cte5hCV0mo2O2NJ99FEBGP7rGR7+K6jdadwKNmanpUxB4V5OkbzwfpPDKBdsIUJdqJuDDmkq+yL1ZVsNrtcsaQ71FqEto/X2R4P33W67hQOJcl7Vqu6ozD///vXQTRpLze/wDF0p1f+LWizx6Vl6PpKdVF5NNd9eHhArLM9novFdoHuFEb4bkAKYx3Uv/5P5bvUFjXV/ALHxB2OSwks5C6nMCPJvlpCld2S7rOJeBLuySRV2xNjQjS6S3SnL8IDUhiFTqnycmw3v8CxldZFqbi/0SJ7dhmFduu6J+LxgYFkMgl/xkQBdq+7R3fqIjwghYF0kPKPFNsLTS9w9CppPSTp/oyDlOTIvqR0q/C3Qs6q7mOhkDieEyK7THfKIjwghYEQKN/u9lXZGlBrewq3HhNA+46a7qtaZK9UV9Bkxhdifa7ueuiO8IAUhpR9h9s4pMwouV2t7RjbF15xCE33pZmKOpqRulXF/FS/yE65utdCc4QHpDBEoLl8m46iWL+MGmXS2A4VpzuaQ+q61fLR92vCpYKrewMo3CsApDDEoNPXNiwc9GwdLim2l7EdKl53NIdcfcqpsr8PCWza6+peD60RHpDCtJKTts4oUXRXT5fyuA4VrzuSXUntqaP336/l4L9fu7rjoDTRAFKYFrP38ImW5JorPMAwWZNlApgOFaM7RvaHiuywuLu646FyKAlIYTQoyjVdgXy6W3uaq9VdPU29pO9QfepOzMwiTndo+/J1RfaP99+HcqxEoODq3hAKEw0ghbGJkyQjyovpfD4//QjdWZq8XKO7YmgB06FW4IB9eauc1+o+s7xkkB2SLnhd3RtD31ASkMLYx76dzmtuTeclJlkgcVl6mvBouk/V6T5d1mTPrki96PXVbBXpruP1G032AMztru5NoS3CA1IYezmyg+Z1Iq8yxAOP8tSTaaj7fEove7UC541SUJ9BumNlX3jl9bq6m0JXhAekMDaCmtdtJXk+1KvYPn2lz9OTV0jfBOCar173gN8o++2StDCwWDeInHqOZIfpp+B1dbcETREekMK0hZOnrSd5vr9fmMzLAaavb3hI071vKP+qTve0UXZuZhWNYJDuBtnZabiF4OpuEYoiPCCFsR2U5E3HNUj3/rWFfGC0DzLcL/ZuFXr4kK/XPXrbILucY6q3jZMZv172ebiE4Oq+DaiJ8IAUpp3AjTJgCt8vEe+TGYZ/RialQo/X/QUHeYpkr1TVHKPpHoWyX32gyT4EJzuu7tuEkr0CQArTZo4cMn6REq/7sKo7ZA0WerzuwlsOIsuuer963XDMtPbmO6zsgjqy9I14caSBAVf3WqiI8IAUpv3sPXwOGW+uu0RfI93H38qWlyrqwelKidO4HWIh42trSPZLkwUvnh5gwNXdAA2JBpDCEEAUa9BI3rru83jdIWqOkYs8wh9iJQSBVUiXvY1ggQFXd3Og8IODTUKNq7t+JI+CvEXd+3N3GupeWkG3lRC9omGpxtuQkQww4Oq+TYIyPM93QTKQG5BBCVf3f+ycWQgPQRzHnRGhHDniQXhwFckT5XVc058wDbnb0WY9LKu0LUWsK5QSOSI8IFIi5MlNEkmOnCmJNw/e7TH7253Z2Z1xto7Pi/+x/7X0mdnv/GZmU9p1hkkoI92XhBW6z70Rz6byvUoXsjp7vAoM2AuhXQVBMv91/8ksSoHmkLeHf0V3qE/+oO5pjoFOPg3ux88vmwlM3wyhXQlFMv91/91Ac5BvD3+R7smO1+7dfkz3G7z4uOMGDFbP3oJqjBDajTv3/7o3jagtoB+jEbqnCyi7fa/u8GiBczegkz/xYsOt9WA7rAWrwmWoxH/d/0baNAZu/Hdldz6dyjv5k0c23FoHssNasEq2UfRf93+DNk0iMv47dT94AZ4jc6grn1WCtWAattrov+7/CG0aRmT8t+nOa+4wnXr1PKwXgLVgdRxyFqF/S3eqBAkw+MwMhhM2IRU2jbAV12AhPXCC6m+Nr7V5ukfVyW/X/SI8YODskg2F8iP2tTkmmIzUNEN3OkUHLhxHkAwu1502mdSmvOSJ+eJpCKrGgYsps6n8VZg+kd9UdxIfDe8CWPQB30YgA5qr+4Zv0v3SATeZRhVGqI42tK/0qqX9k3RnFKf+UJnUK0wZyrBcg+KUlf7MIRGOoHtAIspWe+lJmOJW4rjwlWi7ayPAJjWIPrPktxbcUXifhlMcVENzde/zbdmdj1DPryuE9pU6U07MQNX8Sbpjo6NATDW01FmnjSgQdCdwNql5wO1ARPHXWGG5ndEpWhAHroBqW63MX6Q7jFBNQ7u/CdXxl+q+ST/3AG0CLNfoDlkmMNE9OsP36g5H+ujv1H2Ime7yCHWPPrTvWYpqaZDuLqnBMdNdjDIOFSCpiFJn7al0d+FIMYsn2L9Qdx+l+Mn1/6W69zHTnQgjVGeeNrRv1s5HN0h3gjSY606UvTCVRo4O/41Cd/WSCzcN4+i7dBezu1v4pgC2S4NmOzvaJzkBqqHxuvdL3vSs1x1GqLCBQwOxkZam6U5JRMV1M6qDJRYTP9XSQhIk/Zw4xSxjV+oOlyEmpBCVIfOmZEbOK+ru0Yh5cmOmAdyW3YChMpZ4d2HpvQoZ0njdOw+O33RLXqNVLzxZ983Rc5LO8BEqbODQcChYi/Q0TfdQU20TS+U4xq64CWyqHCLgYpfMNRZ0t5RFv4BHdxphK0+N4RUNCPH4pRFB901h3rOTCoWDNGWFvHWFEHNi4K+vovm6txk6ItG9W8cunXq3iKT7xhfzxBFqcEgb2kmrtWf9IqSjabr7Rqk8KPZ6Fbp7qAwpnMzmx2WCFnWHTwD52lyd7ogj6G45Xu66G9qp/xjYVPx3McpLm5YrDJz//OzeOXo/KNK9e4c2o8e1SrqvuSWMUBdu1Yb2E8dbMQsZ0tAo3RnFRql8njizk0NBd/Xkju3mJyNTNLr78o+FC7INdLdoDCLqoeo8kpA3okR/uLSA/8Evy7X+Kt3btB/fq2ObdhNbrZLuke/rNxps4ABObm9lbNIkmkbpjrWDUCyohpVHURxjIRUWtAq97qR2pIx1ukOrkXVX4xeuOM1iYDm/of1dukfCt5/UtaXU3WQDB3DobKvAnvpJpj9Ld+YWXmPsqo/So9EdXgjwQpgd8Kyk0R1OY6I72VRR58FZAYn92bq3H5vr3q1H/EmSYzS6G4R2ryWxsE7ZBuoe0Ai+KgBgQgpWqgOhnOpgKt3tguWBou0w3gtnBRqt7vw0oU53qM7AejKxDO+LkxLz/kjd27QfxXWPE3tEnGM0ui88aRbaZaZPRlU0SncKy0GUhW8eYplNYjzuChSyIZSblecdHILuKRR64wSszDIBsvjROt1hbjbXnWEOKRjtWMVOnQq6OwjZf8U0U0T/RPduHePXcY7R6L5XvxZsK8gussdGFTRKd0ChO0QZx5qXLo4QZ/TJt+qehxjLSHcPhqgEvtbo7icZPNMdYIUlrB5FQFl38tfMqsYMGNQn6tohx8i6czaZbuDww1YlzjSkpFG6OxhISxVizQWnyyHDVDsGSwN/VHfkyrorGpuVpwssG6eQkub+Sro7Xp5iMKts4j5/o9b9j5tVTWg3sCPkmErdt5utBXO9Vi0zlyIFjdKdmC8Rwwj4cd0dle5uxfIwEFCnO48hVlF3uzDHNM9RrbekhejkyYuGs0UHoYVqaKzuKZBj1Lq7eJPBWjDS0rFLlWj+UN1JLCCJoCXdzaFgLfVIhM11D0hEyCqyDNwNqEZ3OL9JIRKghdk0hiTMdng0WvcBkGNk3c1ZefVu15aevcuRzJ+pu2tlPwp/gu763UyguF9QP6jVHcLXd+keyluZIoK/Qfd2Y1o/rPu1uytW3G2ZsGYREmmU7gHJyEYjFQuAN0Ff5yt0JxoCc93Vy8NweZcHlZeIZc6Sb9SdwXGuJeac8K/QffbIcT+m+72XK2Kut0zYtRuJtL376O3Dt28ffWyA7kBY7MXLVgWFfGGXdZ+igVToDkskFYTQzvISvFVXmYFL+jbdifJWRZP3f4fus2eP+QHdj75bkfKsZYYQCO++vb2F8/CjSvfV6Dcg647z4ZxqYey84mH45+mOp1SvtuFrioV3m+p1t/yS7gwL8IpmAZoNi2FNTQBXtulv0V3u4M113/Zp/4qMXS0Djs1ZWpD9Yeb65cuXt9x+qdD982L0y5F1d1K1FIvLPdjrDGu2vJ+mu11Z5YPvQqGvD+p0x5DFQfcSuEJft3ixcCD9a3SPOviu36H7ymHPVuTcb2lZOG1OrvuGt1z1+ZwtL8u6v36PfjWgu6CWa88Dg0Q9QpqQaRFgjFlZ9xCrqNHd8mueHBvwLCMk+Xkmuttl3RmJ8XLdHRKzSbk3ikBb/isqM5HuCX0nyLqbjFCLPG3p2D0nItP97m1wHXhZ1v1DRfceP+J8ETLHfKiaacLcVCoYqjJ5D7MHfpZ1p0hFje7eFMC3kHJ5mCvNOVl63V0EukttJ8h1Z3BZFbr78Zn+Kt2hgzfV/SAP7ca6H4tcB93bPtoSM1/iZVn3cvc+eRqzZ6XM2M3WInPMC5GOMLADkUTdnZ+oO9dTvTWEQZYR9Hf0umNZd9g3zgphRto0XiojJSf4y3Sf3Xecue7bnqyQua7NMbnubd9C1y5we4mc3Uu6T+WqAzOYaS9vrnsAClbrDtb9uO4Qzudh5cY/+FSKVRrdfYIR6C791oNXEI7C2v8e72/TffbsM4a6r7wKoR14ps0xXHewvaD5qezFG03vPnXGLAVGwpvr7uPMDLded+R4JMb+Ud0t2M1N+Iu6LANl9m/avMeBOVnQHUo9rO5Zffjv0332kV163SG0m3fuDpsj6P5ItP3KnefQvddm90W78xCzPAJSjT0ZadHrroAxZIKp7r5ad8uD59sxtxxnLMgykrPsO3R3eEsRdMeVC7/gW+cv1H327MNa3Q+d7foUJDepy+yakYoOur8UbT/1aueVPL0Lus8WO3duu718AbCUpf7/kO8UCh0azHXHVMEmVe9uw1NfnGL13SNBOcsAnlQ2olA08jLdKU4JhL/U8uW/KvkU7ikqiLAyWDjoT9d99uxdtbpvI4nBT/cLsu+v6duPLZ8j6v5RSjKnd97M3wwXdP/8pdi5T+PRZYHAnCTf2EiDTnc1mjCT713yv7vuTqV6O5FL3hy3YuMqrVgzg8tLdql4LtAdZm3BaoBk72Cbk/8nPlYpo8PsEodB97rdSvfvQn6/e98gx4DubR9ntp9KO/WbOx/MB94Udf8o2I7S3G4vkEhbAVRofq/uIKe57oFSd2gFrEL3UAhZGt2ZrLsjHIVl3e063aGB/NnbOxLajSz57oHuykcMAF2v379///qullGOAd0f8ZrMqTs7X52Kk/vOV/PVun8Uh6lLZyXslnVfnnw8DX0/9m/VnSl1Jxaka1l3VbXGr9U9EH4JSQ2OYrLuaJ5Gdw9FkD9e9/YTW7u0usMjBsyBHCOz73ZWgXy+c2c8RL2z87RS96/snflPHFUcwKewVC7FemCpV6utZ73PeMQjxowWBtcdWRfUNemyugUPlGQjaIy7gidgWAggeCNqLdp6RuuRVms19Yo1HlHjEX8w/hV+37HfefP2zc7CVB3KfKqwO7tdrX7my/d93/e991OzNMN0o8lokXRnGb2n7pqoF93ls9Zct0SWcnecx8IXulW6q2qTqHsqKsIzc6QNF5TgDwpZ974iumPnRN+C173sRJhOfcpNd9xiQI17HoOkdkNwxyEqpDEbWYyXc/ef3igoLi7p5WWZDlH29Xz8epfuhT6jOLGCBqt8KDYseNh234WgdFDaLnntkRHlpPSSabcdmcMHs/ZBSLv0B0jp9KuwZeCC3DQPdafTqUMuumPSrsI9j0GSY9M0uDO+GgTVNw1+er3A96D7fTclVMP/JRmTk2ps4a53JHkhPvG5HuAXNN9SxvtlnnLSHbcY8J7HdDx31dDxGNxpHjP46S+DX5GyO2fnPVc4tsIsac6ZFqnh4VQYn/U2B7r7B823EN1ZgH8adX+1jSBvMeA9jxm6ymz5Wuwd2LhjkPCpVXb/TUcUujePh00lieZAdx+h+RaqOwZ4jO7AHdIWA57zGFir2vKYVHIH2TeJqftnRWwH3ZuzCbOQ3gx5RQ/wC5pvKcOGyEtZgEfdn8BppT2Tx4ym4PtnYnDftGMQwvvWjV9haeZbvQh3NROyuV5TJJXI0uuZK/QAn6D5ljKrIRLW8M3SR9NU94cgvN/x0tOzeyiPGaMtkd+Iuu/YtBHC+4+Dv6DuP+tFWDLSzBjJjCfS6d7edCI3Dq4zxsP36P8anazugiSVxQlavOm0fgvfxCLG0YVyByVVQqGGF0tY7Yh/bIzsxO5nNN+CugsB/qk25vsTPY9g25jHPGYIQjvXHW2nU02g+1Zsi/x2iV6EJWnw3YlEwgx76It0OIQuJewA2YY17fa+LnhqEDrx3dTEfhjoEC3ZOaRRKj+W6+VJySSZvTEQdqdYpXMGtnt1sXJ5lCwupWe7JnXfovkW1F0M8DVU9+g0T25mPecxsLRDoftWkB2SGar6lxHSatm5XndmSbbX0fdcDqo2HgRQ6o6qihi2qwY+IiYqxFbqbtCYH1U10+BbYgYlPynUyedC+8m+jvxDfIvmWwTd2SJtGuCfvmqaeo99wZ7ymKcaW5S6Q0lmE9P9q0i+TWFYd2RJ83gqo5Q9m0405zy0iXnTnQb1K2luwuIu234XT5an19rgHexFAz9DArwWdDfsE7hRnGWF712B7h51R1iAl3nKQx7TKzz9VdQdSjJM903CRLyzszBUzYTTmULZE+FxyN1NM6zPH2KX8IzLFWPfkWg+Mrcb1v0AX12ie5S+qONZBfkUp6uP9QVHsbuAJS+GrHvMyDfNGKRbK8kmen2L5ltQdzHAj2IN3iXAu+cxV/UJz2Pxv5nuyKYfv9p4/UZbG5pTBn5Fmo1IU4kM5jS0UBOmtZmMaab1+VKy7nJkFnWHld1tbMN3naX7PdApq9Q9Rm8Zgybu7e1GFzGfB2vUnc/XC/sZpfKnCeSze9+i+ZbQIdcUUKMO8PPJY+LC9SSpb+y0676RVmiuFHEqOgynmOCZRNgMpxOJHNmGCRwfZ/JDdM/o88a77uqhasyezEST9BEPzJ09JKjTzAT31EXdxec6/rMYQe4+b8ouLDT7o2kM8CJDc85jTDHSG4TdoLtM5EqRB3Ql95jhLIb0zHguAQh1yJE0TK3q88ZZ966oQBdPZkBavnhIncwoMn2mu2FbEMQCO1zGQbaoexJe4Lob/YHue4oGdYAfKrz69Oi885gUbx0c+rZQ9yttvKgrWWei7yqI7f+K7jJ0c1Qjv9W5Qb+2yUNVdj/A7ZBU6E4/OikeGtODhUhR9xjqzm8oir9FXwC6ayEPAb60PKbRarD9e6dLdO/WlTxmqnzH2B7ONHvRnYpnIFGioI7RXaCbRGbWW2ErRHZZuTuAuXunlLuTjFxcj0HeLxci+41o/sg7o1D3tkB3z6yeY4B3z2NGTeG5GQeF4vzXdwW6D5ZyEMrnJkFdeM+koTTjSXfnQmRULyQK9IHeoDNOC1HdEUx9UHeHanxPUo9FVXV3uAWVukdJwdLnaH6n/JxCs2enoW1McbmUPGasQ5TfsIhv2SL7vvNNW2e9Q+X985wJqMJ7NgNX/z3dU/Lu7JLYqHunIdHjrDsjKe9vLeieJHdBrFD3fvLbfY7mf1acqAjw09g2JgX40vOYjljcsGL7FsJ3O0XZd9dsAS+QNfvqSj5vTmM648ASfd44JzPRmDz1Sd2VMZRXue49VH2dJend9DOwqijdSXRCtT9fd08V6m4Euu8RjjtDkbo4BPjieUxMeD7cyWSnbMmzOy/8t9/8+ef7339knU78kHF+Q+1+hcqD7nR1R8qpj8Bjx7t6qOqse09h1pKKSbQVVmbgqljMlD9ammbq11W6wyOfo/mfk86eePSjkgP8UGl5zLomA8DwTlV/f8urNVve/+7e3bvvPf5P4I8//vju0ddYd32kzQAuOFYrq9pvf3uw/pw2C4DvDvE9+5juARfdpevMWA4+NxQG90m69/MtvNx1p02XCt1jge57gKOOmWhtbd2mCvDqSSeHPGZoWHgeZkNUjO7vU6Kkjb7riSee7eqikt8RmZlqHQDe/PjtmQdotfKiECkYVe0jKP85n0RNmQmF8CO5cFL3wBx1V2ctRgF8I2EDKzPtXcLOve1i6m5IuusEhe4p+pv8jeZ3zn10oJXwQqkBfoNrHgPPmegY3bnufxXu1nQHCD/55ttvD8y8aFAuvZgPoSuWHXgAbxDDkSnOLiEjML16p+4F77qzbnfiPBm06rRDPalLuuuGsNFMn7g1mLvu1hUft8ssBN1PPhNsZwyUGOA3OOUxCB2iytH9ZeD9v64tsGVmijJzx0sG5/zVWp66yqX7ou8qRsjOqLfrHpiz7lG5BMNevZt+Di3J653wVJd1bxMKM3eLkwyi7ne76O7vxR1+1/3k0ydb8zw6MFWjmF0qCPAbXPKYJBuiStEdZKfGf7fmWacNVw3k1BWaRXXtwQlH23s977wR61boDle57ganDXXvjwkw3cm3FNW93QDIioyeGN3d1+i8uwtzd6Cf/iQg13heY320+NMiCsi6s3Fy0BHpwfZTRNsjkcgaMFtGDvAbCvKY52yhnhmO0Z09fpnx+yvA799tW7N917MPy7s34ZuBC8o0JHSk2au2PRMG29OsMHPjuiTsxwGkhpPr1uulApYpdIdvVHd50te5ENkjjldpiZyKmozSASo8Ja2P2GZj5TWF00yd1uOUbtO9O+iZ8UK5ENsnJiKEqWnXroINUh7TuU4M9XGb5pjVoOyMDxi/29J4/l76C8as5djZA04rZe81gRw80m9sTJk2UiWecyAdCSzq3tNn170rpqummbrb6dUUBHO8Rh7fDQX2bjoB201q6HQ+6m7aYGM7UTiKh4HhGBfAarxN91RXoLunUSraPvDoTISx3S3Ab7DlMaPDLXKDTFyO7vDdJvu7H6DuImJ0j9MxK2Mt1z2bHbGyGNIMDKSz5EnSw8EesZivF3/SJkzhsc//dTX/chLYjqnMa5E8zyoC/KwQ4DdYeQw7ZUxukAGk6A66f/geeL7Zbvu730m6W9Gdcj5L4Q/D6J7NJdIJ0uxOVYeG9yxPafBkj2RjMjkc5k/b9YDiLCbdTxkQgntEYLtiOpXMpaLuQh4jN8jEUVgxus/+vnnz5vfor3ct3vtLSmbgraLzPIWvhEQlg2E9Sxvec1ZJMpOP5i3WOQc83HfoAUVZRLofJQT3iYGIyMy2IgF+A+YxKTGLjzG5Lazn8e8ff+U9xmZB9g8/tOneJYiOkBS+Mmui7zJoe5jJjsKn6MUb9YBiLCLdTx9oRSZ5LoNsn3XsC97A85imFlWDTDz/C5+C7I9z3SHEv7uZ8yFg070H7xb8FDbttJKkK2Gl7yO4dWTHDXZaTIKPs9y9E82vnIzBHXV3C/BP0baxDZDH4GmpqHsMZUVl2V9f/PA4sJnY/hZYDn/Dl7eeAdlf3tIt6t4maM5hjy5nLTOJEWUhkrP+Bgn60rAeUIzFozsOVDGZkdjl0FWwgeQxckvkcDg1hrYKzj792eOU95555i0EZAfeNwyb7t0GYv8J8Qlbx2GG5ZaZnAn0mpRGZXT3e4vJXofmV46iNXccqk5FCph5Vd1VwJaiyrqHoStMIj5LZOe6C7I/D7xM3t1vW8sk3SmY/9+fT1wSqd5cZkS0HUiYjHXyoXyEhB5QjEWkO0Z39L2AXUOqAA9LOBS6A1eP2gL8LCTtnFs2P4MQ2yG0E66yp+7q6B6/dbwZyWYzmQyrv2dNCiY0w+swoekY5uPXYC/s4iwe3Y/juqPvinxG2VXwVIvC9qYwZWzUQGZ/QNlffx11Z6Hd4Dws5jLq6N55UNNzymFqzqSMZMRzPZJQdk/h8/F6aKoMcGbx6K6dMtFqY3JSFeCnatx17xid6QwzTAzNlu+vA5sF2T/cgjq3CWVIZXSP39YEXD2u0D3BdccBqwwUc+o1WC6ybCk0zweoWES6n3TMQKsU4FvVAd5F99iuSAR05zw3akn7PZMddX8eQzu3+QFrSyVplEuJjzVxbqp3jO6Q1SdMBXRgqzHK6yr3CwJ9IYtId/B9QvZ9YsY1wMu6J1+NAKA70mkJDwdsM93fAtcxtAvZyhNYhVREd8hjkINqD7bbXl+PurOlTjZSuSx9kyZSVrHsiCDQiywm3bXjTudrO5AJ7J1BsG1MrXv82QjTXcDkxjLjUff8EDWOQmNthiztkKN7nMqOnKOVV61cfvSh9fX1hx592Mqq08YTprghRxbO9WANwOkENhgcqhVSHWQ3yKLSHcozbgEe28bUupvbIwzUHTMaa5b1B6I75jHsOj6I2mM7Xsc8BlmhCaw4AdoK0ui7A4fyJuJAegcWme5zC/Cy7sn+CCDrjhkNNvNCgH8Gh6hxW3Q3wPcnHjAKZqg6mwo4UUxLTqCa51i10dH2ag1xkh7SmyCnXzS6KwP8gCrAz2yTde+ciqh1l2s08fjshzhEReXzT+82ZHjSLtOgIWfxqJ5NEN/H1bYvL9NcwJweBrL76gF7re7HNqxau3btqoZjVQF+EuecpLYxUfcw5DFK3ZGmUQP5kA9RxdycP5VDOyk+KjkEU5PyIzGJGRlPh820ojB/dJU2N0J1tfssDUL93qf7irUnmHlOWHusdtTZE8VLkhjgUffGabwq666s0fA8hoPO4xcEk3YF5+AfgJ+XbR0/Oc6aC5Ds4Y5pu3uo32fpvkFWv7foXnaWyQibjLNCuP2GMOc0E1Gwa5bpPjYVcdcdiI0KM0Yo+hBpZGePhzDiS8VHFQcdqzHqTEIa5VY1wa/VPFFdBQlOYP2C1/1YGtmHG1vYsh/i/OFlEOAn5RGrOsC/CrqnohHAXXfMaJjo1PMhlJ48ZLIjWHx04LS8i2kT47uKcXjxyHLNO+XE+qCCs4B1P1xqlyXdVKARBni5JCmzq2Yar7vqjjWauH3xBwFlH8pfhjzGhdVc96xJcTh98jGTsELzgpzh1O4TlHAWoO6raWy/QcAEyujOqJMuJUnEVXc5ozFoMOeeD6H2eAvQsC/nMc6j1WpcoFo4SB1p/pz1Q67U9jjldVXL9guGswtI91Wy7utNoAE30JNLkl50R/pGrXEp1xvgoZ0/JHmMO6s0QgWMRXtNRhj2IxixNpEE/TPsepX2rxGqq6oMtF8IuleahOR6aw0zqqEM8FOedEfio1huF6TnD3AS1Z2DaC29iiboKRMJp3p7U2EznBthmTuQq9D+dUKQ2pPiZZDb+1X32oRJGW7sgM7d5DDrC6+wdkidkAO8d90xo7H0xjErFh9L5EJamcGDhE2LcCIjtEqmmyu0/4zysrraZfssDSo5vtN9JfSJy+Saa602yVMmB+Q2eM+6Y0bDs3TDNsPknrTLrTNlR1sF9vFcjuw6kxmxb5PaDH+m/4GyOoj3Ryxe7zWfcRjdWxHh+84Jw7qTz8UAjyVJz7pjRgPE5W31SpcdW2fKjy66BXYvifMrtf+TUHVF7TIQf5El+JrPWMmzgDAf59G+cB4JMcDjkBVLkp50lzMazN8xj5kLF1ObnHzP9oZ5taZS8wfl1TTiL91/MYR8zWeUH4y7z1lbjC4vt7/n3GMm5JKkN92RMZxmxWawuXJQiN239crp1HGsTFZoviNEzCcxf69VX/MbIfBdYrmGuAR4r7oDT4lzTH1NcwZbZ0IrD1UJ72PbC4I+SXeWHrg3VXY0/yFpcihmMh4CPOruTmzIpRnMFZwvrcNbV8RXqUzJpZ2KWoj7+4H8+y4s+w/Yd/8Dlx6xz7LK2qqK6jLNh5TXLq/Pu768ymnhR0GAH5jxpjvSN0Rln09olxd6VNWrF3b4Pba72V9dVwFpD/Wf3AD+Ge8ewPTeD/yuqqirDmkLAwgn8K8b0ooAAV4uSXrTHTFnjc55yi4v9Agtqy+UfeVC+b9QOiFyB1TU1tJ7YL+l5C6A2+Bf+0FwAGi97/77H0jNBrUra4ncZXvff1f1yj5sg3dgOjw3nmvywiHl8s8qi/rlteXaYiIUqq6urqurIDdDbSWwDO4Iwn6UI5YWAApT6LuWAZWgM/hcUVcHHxUKLar/fqEVqxsaVq8+tty+su+FNWvWbNu2ZldEzfax8FyINXninILu9JWHEVZWVWsBi5jyshUrykpvhl91Gi50OvLwtavLWYBfc9VYzOTExh7ZHlHx6tX/RXjHhR4BARJlqw5n5p62KlTCndFwuClx5Npjjzqm5jlT4rkHnlXuzmHOIX1v8sRpWkCAnVVkBfMw2yT0yAbXTniQXQGEewWxV5VLP+L/WTqzWgsIkFvbk1abb4Pbuxnh5LqW9evX825JJJXssF82lGXJF/v+o/B+yKIaTwW4A2F5WDjM4nCtGA1c9kZx5UcSZe8QLrcw4UcjKmYeiP034X2VFhBgEQoL59GBuDcVzfKPZFpLRxxR3/GukS6/GFEydVW4NEr0+o9fvwZ+Pf4aabTqyxm8gP+LUC6/jKMjmYJHb5SQyjQqvAZalOd8jUYc2DW2x8L707/ufDLP18dLCz0CApAQrGJDyM5yWhHOUh/XOFxM95jzJGv0uT1TjDz+QdD8nXfe4cJ/+4e9dSYgwNK9eSTXm1++PNJcVPeDTWUyky6WzPRCecaJmUfMPRDed4Pr13GY87tvFVtnAgLEhUtAFnDvEVwujkmRZM7kvrcoRrDw4nTEkSnDa3gH26+/ToQI/+3T4kKPgACksl5oJakqfmskhIojDfEt65Jh01rnN5xsJ5fXtzQOm4zeLHzBLZYUbG/yVow8HiM7Ar7v/AKT9726YSlgzoQqD64vrW1qOazYVpAdQd9lUlmie8x5Z46ZiUe3uRUlry42Sn3Q0nzjVivAf8vymUOCiaaAQqBfrlxz5Wi2X4XMCB7zJZOGl0xgm9POHFNkhfcLNea8w/vX11ls+lJIaL6mTWLBNFPAvDmanw0g686OZ5dgS/2Z7jUObfCv8d5hl07JmHNwR9e3fvrljh1bBd+PbzoxaBEL8MDB+bMB7MfXidsXIb109wKu+0fKNviZAbCds6ZoUfIg1+D+1SDly42Yv+8MxqgBnqgFfXGfxVwikcCNiqztixL0cta2rXSqRrVw+zXbVjUTNUfOPbzfjMF9B5i+aceXgz9avl+mBQR4oUq9R1FOcRFtB7I1BQu3Z1oftS2CmjzluLKz5hzej0fdBwe3ktz908FNmM6cpwUEeI/vMjkz52g7O4b9o/y6vsnWqZmZmSkw377r3qOnn0yOlzl8juF9txDdvyK6bx3cYZUjL9EC/mnvjnnTBqI4gJ8wDM2SJQ2mBlFwBYhQEBKhcQekiFadKqsSo9kYyidgYIMVvKQDCKnqbPkbMEZWs1RUSpd8AT5HfYU+ruczpsIMJO83esny18vd4/kZhZ73vntS/6ILDHvrdXs/4EXW2Yia8juzr8hKohhY3sV9GdtczmlnZr7Y3FYbBKG9xMRxb/UEYe+sww5x9zHOZTcd0VL6P5qRvwxwZ5qOG3fG1/cEob2c8Of2wU2fxrrPRX1w0211O5N10b/dlvZp/TVh5KuB5Z2NO1gsTdO2mAd4eEf7kpJM1IcD11Af0pn5ifc5UD/AtRSwl1TPC4KfBPziDiy3wC8XzPAMxh3tTRZ9sdE10P2oUdjN4TEe1cqEJ2XSu5X3nxD1+dw9vz/YpjnHuKMwJQV5p6PtE13seRSWL3nM6lkiEr3cKe/3EHfTpEME9MYKcW9j3FEIYqq39Q7XUg5shRcV+CmUdo6wKZne1nd3Vn13gynvbbyqolDE5HNvH8at8PQFEc6533a98SxXK5AtEsXA8v7Z2gwRPFhu3C027tiIRCGRYi9lVaFxViD6w0mn3+25EwRs5hWyka2vOu7j8XQ2qlwVgv5GKR1U3u+ZRuTScWzHNC04u2sEodBJqu5LkQhDytYq7q9MuUotWyA74OYK4h95twawlya1gAd4dEcHEVF8035CPMokmLgp2RKWd3Dn2GzjHc8y6DCisi4kR8jeMsVt5f3bd+71DtAmCIUPujU89RkJQ7S0Ke9nouYMsAwGzv+iAzpNKjpDSZ6SsOSrvuX9jfTOEGoShA4qQr8XIMv0gwEREqpEStiMvKBLk8R5x+lfdLz+zhWk2AWQGfKHZnhhExIdtcgld5ypwn+Q6yYX9reYdnTsXqSY8h5PEIb2T+AbZYLQ0aNzBXHxcjCtsU58s4HHdvQ4SKV00Xc5mHStaRh19JjkqxdnuBwMPRmvcDnYkfsNZUS/PqUJ6UoAAAAASUVORK5CYII=' alt="logo">
            </div>
        <!-- 省级了解 -->
        <main class="content" v-if="type === '/introduction/partner'">
            <div class="content-header">
                <h1>省公司推荐介</h1>
                <p>省级公司:就是代表“创联工厂”医药供应链金融服务平台所归属省份的运营加盟服务公司。其角色相当于传统电商平台的省级代理商;</p>
            </div>

            <div class="content-centre">
                <h2>
                业务职责:
            </h2>
            <p>创联-省级公司肩负着百姓健康的光荣而神圣商业使命,承担百姓安全用药商业职责。为了构建药品采购的“绿色通道”、共建“阳光药房”,为了光荣和梦想我们释放热情、挥洒青春奋斗在创业的路上。
            </p>
            </div>

            <div class="content-footerText">
                <h2>
                    业务收益:
                </h2>
                <ul>
                    <li>1.部署招商本省辖区地市公司加盟费。</li>
                    <li>2.享有所归属省份行政区域所有平台通道收益0.05%分润。</li>
                    <li>3.广告.SEO竞价等平台附加值收益分润。</li>
                </ul>
            </div>
        </main>

        <!-- 市级了解 -->
        <main class="content" v-if="type === '/introduction/city'">
            <div class="content-header">
                <h1>市公司推荐介</h1>
                <p>地市公司：就是代表“创联工厂”医药供应链金融服务平台所归属地市的运营加盟公司。其角色相当于传统电商平台的市级代理。</p>
            </div>

            <div class="content-centre">
                <h2>
                业务职责:
            </h2>
            <p>创联-地市公司肩负着百姓健康的光荣而神圣商业使命，承担百姓安全用药商业职责。为了构建药品采购的“绿色通道”、共建“阳光药房”，为了光荣和梦想我们释放热情、挥洒青春奋斗在创业的路上。
            </p>
            </div>

            <div class="content-footerText">
                <h2>
                    业务收益:
                </h2>
                <ul>
                    <li>1.部署招募推广人加盟费。</li>
                    <li>2.享有所归属地市行政区域所有平台通道收益0.2%分润。</li>
                    <li>3.广告、SEO竞价、产品上架费等平台价值收益分润。</li>
                </ul>
            </div>
        </main>

        <!-- 推广人了解 -->
        <main class="content" v-if="type === '/introduction/promoter'">
            <div class="content-header">
                <h1>推广人简介</h1>
                <p>推广人：就是代表“创联工厂”医药供应链金融服务平台寻找签约及服务药品采购商。其角色相当于传统电商平台的“业务员”；推广人又分为单体药店推广人、连锁药店推广人、诊所推广人等！</p>
            </div>

            <div class="content-centre">
                <h2>
                业务职责:
            </h2>
            <p>创联-推广人肩负着百姓健康的光荣而神圣商业使命，承担百姓安全用药商业职责。为了构建药品采购的“绿色通道”、共建“阳光药房”，为了光荣和梦想我们释放热情、挥洒青春奋斗在创业的路上。
            </p>
            </div>

            <div class="content-footerText">
                <h2>
                    业务收益:
                </h2>
                <ul>
                    <li>平台通道收益 0.4%分润。 </li>
                </ul>
            </div>
        </main>

    </div>
</template>

<script>
    import markdownIt from 'markdown-it'
    export default {
        name: "Introduction",
        data(){
          return{
              type: null,
              content:'',
              type:''
          }
        },
        created() {
            this.type = parseInt(this.$route.params.type);
        },
        mounted(){
            // debugger
            // this.initData();
            console.log(this);
            console.log(this.$route.path);
            
        },
        created(){
            this.type = this.$route.path
        },
        methods:{
            // initData(){
            //     if(this.type){
            //         this.$http.get('protocol',{
            //             params:{device:'webapp',type:this.type},
            //             validate: state => state === 200
            //         }).then(response =>{
            //             const { data } = response;
            //             if(data.content){
            //                 this.content =  markdownIt({ html: true })
            //                     .render( data.content.replace(/<br>/, '\n'));
            //             }
            //         }).catch(error => {

            //         })
            //     }
            // }
        },

    }
</script>

<style lang="scss" scoped>
    .top {
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        position: relative;
        background: rgb(102,89,255);
        p {
            position: absolute;
            text-align: center;
            width: 100%;
            z-index: 1;
            font-size: .36rem;
            font-weight: bold;
            line-height: .88rem;
            color: #fff;
        }
        .go-back {
            position: absolute;
            left: .2rem;
            z-index: 9;
            svg {
                width: .35rem;
                height: .35rem;
                color: #fff;
            }
        }
    }
    .top-title {
        text-align: center;
        span {
            position: absolute;
            font-size: .36rem;
            font-weight: bold;
            line-height: .88rem;
            top:0px;
            width: 40%;
            left: 30%;
            color: #fff;
        }
    }
    .mint-header {
        background: rgb(102,89,255);
        height: .88rem;
        font-weight: bold;
        font-size: .36rem;
    }
    .mint-header-title {
        font-weight: bold;
    }
    .introduction-box {
        margin: .2rem;

        .title {
            font-size: .48rem;
            font-weight: bold;
            line-height: 2;
        }
        .edit {
            margin-top: .1rem;
            height: 3.7rem;
            overflow-y: scroll;
            font-size: .28rem;
            line-height: 1.5;
        }
        .send {
            width: 3.2rem;
            height: .7rem;
            border-radius: .7rem;
            background: #26a2ff;
            color: #fff;
            margin: .48rem auto;
            display: block;
        }
    }
    .info-list {
        li {
            height: 1.2rem;
            line-height: 1.2rem;
            color: #333;
            font-size: .28rem;
            border-bottom: 1px solid #f1f1f1;
            span {
                display: inline-block;
                width: 1.5rem;
            }
        }
    }
    .tel {
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0px;
        padding: .2rem;
        a {
            display: block;
            height: .72rem;
            line-height: .72rem;
            text-align: center;
            font-size: .28rem;
            background: #f5f5f5;
            border-radius: 5px;
            color: #26a2ff;
        }
    }
    .fade {
        height: 1rem;
    }

     
    .content {
        margin-top: 1rem;
        font-size: .28rem;
        color: #333;
        padding: 0 .58rem 0 .5rem;
        line-height: 1.5;
        h2 {
           margin-top: .2rem;
           font-size:.3rem;
           font-weight: bold;
        }
        h1 {
            font-size: .48rem;
            color: #333;
            font-weight: bold;
            margin-bottom: .57rem;
        }
        p {
            text-indent: 2em;
        }
        .content-footerText {

            ul {
                // padding-left: 1.3rem;
                text-indent: 2em;
                li {
                    line-height: 1.5;
                }
            }
        }
    }
    .Introduction-logo {
        font-size: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>